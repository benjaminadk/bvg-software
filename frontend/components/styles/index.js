import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

import theme from './theme'
import media from './media'

const GlobalStyles = createGlobalStyle`
  /* ${normalize} */

  /* @font-face {
    font-family: 'Cascadia Code';
    src: url('/fonts/CascadiaCode-Regular.woff2') format('woff2');
    font-style: normal;
    font-display: swap;
  } */

  /* html {
    -webkit-font-smoothing: antialiased;
  } */

  /* body {
    box-sizing: border-box;
    font-family: ${theme.font.regular};
    color: ${theme.color.black};
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  } */

  /* *, *::before,*::after {
    box-sizing: border-box;
    user-select: none;
  } */

  /* a {
    text-decoration: none;
    color: ${theme.color.black};
  } */

  /* #nprogress {
   pointer-events: none;
  }

  #nprogress .bar {
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
  } */
`

export { GlobalStyles, theme, media }
