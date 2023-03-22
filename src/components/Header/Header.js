import styled, { css } from 'styled-components'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Header = styled.header`
  ${({ theme }) => css`
  height: 100px;
  `}
`

const Top = ({ global }) => {

  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', () => {})
    return () => router.events.off('routeChangeStart', () => { })
  }, [router.events])

  
  return (
    <Header>
    </Header>
  )
}

export default Top