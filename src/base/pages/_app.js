import '@/scss/base.scss'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { appWithTranslation } from 'next-i18next'
import { storyblokInit, apiPlugin } from '@storyblok/react'
import { useScroll } from '@/hooks/use-scroll'
import { useStore } from '@/lib/store'
import { useLayoutEffect } from 'react'

import { 
  DefaultTheme,
  ThemeProvider,
  generateColors,
  generateTypographySettings,
  generateFontNames,
  generateFontFaces,
  generateSpacing,
  generateMQ,
} from '@/styled'
import { DefaultGlobals } from '@/styled/default'


gsap.registerPlugin(ScrollTrigger)

gsap.ticker.remove(gsap.updateRoot)

storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN,
  use: [apiPlugin],
  draft: true
})

function App({ pageProps, Component }) {

  const lenis = useStore(({ lenis }) => lenis)
  const overflow = useStore(({ overflow }) => overflow)

  useScroll(ScrollTrigger.update)

  useEffect(() => {

    function raf(time) {
      gsap.updateRoot(time / 1000)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (overflow) {
      lenis?.start()
      document.documentElement.style.removeProperty('overflow')
    } else {
      lenis?.stop()
      document.documentElement.style.setProperty('overflow', 'hidden')
    }
  }, [lenis, overflow])

  useLayoutEffect(() => {
    if (lenis) ScrollTrigger.refresh()
  }, [lenis])

  useLayoutEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, [])

  const colors = generateColors({
    body: '#000',
    black: '#000',
    white: '#fff',
  })

  const mq = generateMQ({
    mobile: '47.9375rem',
    tablet: '48rem',
    laptop: '64.0625rem',
    desktop: '120rem',
    widescreen: '160rem',
  })

  const headline = 'Inter'
  const body = headline

  const spacing = generateSpacing({
    min: '1.25rem',
    max: '3.75rem'
  })

  const fontFaces = [
    generateFontFaces({
        name: 'Inter',
        filePath: '/fonts/Inter-Regular.ttf',
        weight: 400,
        style: 'normal',
      }
    )
  ]

  const typography = {
    h1: generateTypographySettings({ minSize: '2.125rem', maxSize: '3.75rem', minLineHeight: '3rem', maxLineHeight: '4.875rem', letterSpacing: 0, weight: 400 }),
    h2: generateTypographySettings({ minSize: '2.125rem', maxSize: '3.75rem', minLineHeight: '3rem', maxLineHeight: '4.875rem', letterSpacing: 0, weight: 400 }),
    h3: generateTypographySettings({ minSize: '2.125rem', maxSize: '3.75rem', minLineHeight: '3rem', maxLineHeight: '4.875rem', letterSpacing: 0, weight: 400 }),
    h4: generateTypographySettings({ minSize: '1.25rem', maxSize: '2.125rem', minLineHeight: '1.625rem', maxLineHeight: '2.5rem', letterSpacing: 0, weight: 400 }),
    h5: generateTypographySettings({ minSize: '1.125rem', maxSize: '1.5rem', minLineHeight: '1.5rem', maxLineHeight: '1.875rem', letterSpacing: 0, weight: 400 }),
    h6: generateTypographySettings({ minSize: '1.125rem', maxSize: '1.5rem', minLineHeight: '1.5rem', maxLineHeight: '1.875rem', letterSpacing: 0, weight: 400 }),
    p: generateTypographySettings({ minSize: '1.125rem', maxSize: '1.125rem', minLineHeight: '1.7rem', maxLineHeight: '1.9rem', letterSpacing: 0, weight: 400 }),
  }

  const fontNames = generateFontNames({ headline, body })

  const theme = DefaultTheme({ colors, fontNames, mq, typography, spacing })

  theme.menuHeight = '8.75rem'
  theme.maxWidth = '90rem'
  const gutterSpacingValue = 1.5
  theme.gutterSpacing = `${gutterSpacingValue}rem`
  theme.gutterSpacingValue = gutterSpacingValue
  theme.maxContentWidth = '108rem';

  return (
    <ThemeProvider theme={theme}>
      <DefaultGlobals theme={theme} fontFaces={fontFaces} />
      <Component {...pageProps} theme={theme} />
    </ThemeProvider>
  )
}

export default appWithTranslation(App)
