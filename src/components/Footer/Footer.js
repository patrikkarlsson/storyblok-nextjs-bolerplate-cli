import styled, { css } from 'styled-components'

const Footer = styled.footer`
  ${({ theme }) => css`
  `}
`

export default ({ theme  }) => {
  return (
    <Footer theme={theme}>
    </Footer>
  )
}