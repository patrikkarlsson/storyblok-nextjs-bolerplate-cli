import { createGlobalStyle, css } from 'styled-components'

export const DefaultGlobals = createGlobalStyle`
  ${({ theme, fontFaces }) => css`

    ${theme.normalize(fontFaces)}
  
    html {
      scroll-behavior: initial;
    }

    html,
    body {
      min-height: 100%;
      height: auto;
    }

    #__next {
      width: 100%;
      margin: 0 auto;
      position: relative;
      display: flex;
      height: 100%;
      flex-direction: column;
    }
  `}
`



