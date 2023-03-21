import styled, { css } from 'styled-components'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Header = styled.header`
  ${({ theme }) => css`
  height: 100px;
  `}
`

const Top = ({ theme, global }) => {

  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', () => setShowMobileMenu(false))
    return () => router.events.off('routeChangeStart', () => setShowMobileMenu(false))
  }, [router.events])

  
  return (
    <Header theme={theme}>
      <img src="/img/faktum-logo.svg" />
    </Header>
  )
}

export default Top