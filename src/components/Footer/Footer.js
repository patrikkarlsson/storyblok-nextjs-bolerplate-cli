import styled, { css } from 'styled-components'
import { useTranslation } from 'next-i18next'

const Footer = styled.footer`
  ${({ theme }) => css`
  `}
`

export default ({ theme  }) => {
  const { t } = useTranslation('common')
  return (
    <Footer theme={theme}>
    </Footer>
  )
}