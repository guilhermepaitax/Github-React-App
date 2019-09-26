import { createGlobalStyle, keyframes } from 'styled-components';

const shimmer = keyframes`
  from {
    background-position: -468px 0;
  }

  to {
    background-position: 468px 0;
  }
`;

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,500,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100%;
  }

  body {
    background: #F8F9FD;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body, input, button {
    color: #3F3F42;
    font-size: 14px;
    font-family: 'Montserrat', Arial, Helvetica, sans-serif;
  }

  .shine {
    background: #f6f7f8;
    background-image: linear-gradient(
      to right,
      #f6f7f8 0%,
      #edeef1 20%,
      #f6f7f8 40%,
      #f6f7f8 100%
    );
    background-repeat: no-repeat;
    background-size: 800px 104px;
    display: inline-block;
    position: relative;

    -webkit-animation-duration: 1s;
    -webkit-animation-fill-mode: forwards;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-name: ${shimmer};
    -webkit-animation-timing-function: linear;
  }
`;
