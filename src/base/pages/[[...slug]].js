

import Head from 'next/head'
import { notFound } from 'next/navigation'
import { locales } from '@/locales'
import { useStore } from '@/lib/store'
import Layout from '@/components/Layout'

import {
  getStoryblokApi,
  useStoryblokState,
  storyblokEditable
} from '@storyblok/react'
import { render } from 'storyblok-rich-text-react-renderer'

import components, {
  DynamicComponent,
  AppContext,
  StoryblokHelper
} from '@/storyblok/'

import localComponents from '@/components/'

export default function Page({ story, global, theme, locales }) {

  const lenis = useStore(({ lenis }) => lenis)

  const blokResolvers = {}

  const dynamicComponent = new DynamicComponent(localComponents, render, blokResolvers, theme, storyblokEditable)

  story = useStoryblokState(story)

  return (
    <AppContext.Provider
      value={{
        locales,
      }}
    >
      { story.content.meta ? <Head>{components.head(story.content.meta)}</Head> : null }

      <Layout global={global}>
        {
          (
            story.content.body && story.content.body.map((b) => {
              return dynamicComponent.render(b, b._uid)
            })
          )
        }
      </Layout>
    </AppContext.Provider>
  )
}

export async function getStaticProps(context) {

  const { params, locale, locales } = context
  
  const storyblokApi = getStoryblokApi()

  const storyblokHelper = new StoryblokHelper(storyblokApi, locales, 'start', 'BaseLayout')
  const version = process.env.APP_ENV === 'production' ? 'published' : 'draft'

  const story = await storyblokHelper.getStory(!params.slug ? [locale] : [locale].concat(params.slug), version)
  const global = await storyblokHelper.getStory([locale, 'baselayout'], version)
  
  if (!story) {
    return notFound()
  }

  return {
    props: {
      story,
      global,
      locales,
    },
    revalidate: 3600,
  }
}

export async function getStaticPaths() {
  const storyblokApi = getStoryblokApi()
  const storyblokHelper = new StoryblokHelper(storyblokApi, locales, 'start', 'BaseLayout')
  const paths = await storyblokHelper.getPaths()

  return {
    paths,
    fallback: false,
  }
}