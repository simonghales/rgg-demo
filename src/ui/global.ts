import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

export const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
    margin: 0;
    padding: 0;
    background: black;
    color: #fff;
    font-family: 'Nunito', sans-serif;
    font-weight: 600;
  }

  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overscroll-behavior: contain;
  }

  #root,
  canvas {
    user-select: none;
    width: 100%;
    height: 100%;
  }
  
`