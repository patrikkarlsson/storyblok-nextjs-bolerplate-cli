import { useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled, { css } from 'styled-components'
import Lenis from '@studio-freight/lenis'
import { useFrame } from '@studio-freight/hamo'

import { useStore } from '@/lib/store'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const Container = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  `}
`

const Main = styled.main`
  ${({ theme }) => css`
    min-height: 100vh;
    width: 100%;
    margin-left: auto;
    display: flex;
    flex-direction: column;
  `}
`

export default ({ children, global, theme }) => {
  const [lenis, setLenis] = useStore((state) => [state.lenis, state.setLenis])
  const router = useRouter()

  useLayoutEffect(() => {
    const lenis = new Lenis()
    window.lenis = lenis
    setLenis(lenis)

    return () => {
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  const [hash, setHash] = useState()

  useLayoutEffect(() => {
    if (lenis && hash) {
      // scroll to on hash change
      const target = document.querySelector(hash)
      lenis.scrollTo(target, { offset: 0 })
    }
  }, [lenis, hash])

  useLayoutEffect(() => {
    // update scroll position on page refresh based on hash
    if (router.asPath.includes('#')) {
      const hash = router.asPath.split('#').pop()
      setHash('#' + hash)
    }
  }, [router])

  useLayoutEffect(() => {
    // catch anchor links clicks
    function onClick(e) {
      e.preventDefault()
      const node = e.currentTarget
      const hash = node.href.split('#').pop()
      setHash('#' + hash)
      setTimeout(() => {
        window.location.hash = hash
      }, 0)
    }

    const internalLinks = [...document.querySelectorAll('[href]')].filter(
      (node) => node.href.indexOf('#') > -1
    )

    internalLinks.forEach((node) => {
      node.addEventListener('click', onClick, false)
    })

    return () => {
      internalLinks.forEach((node) => {
        node.removeEventListener('click', onClick, false)
      })
    }
  }, [])

  useFrame((time) => {
    lenis?.raf(time)
  }, [])

  return (
    <Container>
      <Header />
      <Main theme={theme}>
        {children}
      </Main>
      <Footer />
    </Container>
  )
}
