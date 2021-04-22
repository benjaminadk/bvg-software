import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

import theme from './theme'
import media from './media'

const GlobalStyles = createGlobalStyle`
  ${normalize}

  html {
    font-family: ${theme.font.family}, sans-serif;
    font-size: 10px;
    -webkit-font-smoothing: antialiased;
  }

  body {
    box-sizing: border-box;
    color: ${theme.color.black};
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  *, *::before,*::after {
    box-sizing: border-box;
    user-select: none;
  }

  a {
    text-decoration: none;
    color: ${theme.color.black};
  }

  #nprogress {
   pointer-events: none;
  }

  #nprogress .bar {
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
  }
`

export { GlobalStyles, theme, media }
