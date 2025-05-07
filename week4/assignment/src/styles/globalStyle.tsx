import { css, Global } from "@emotion/react";
import reset from "emotion-reset";
import "./font.css";

const globalStyle = css`
  ${reset}
  * {
    box-sizing: border-box;
    font-family: "Pretendard Variable", Pretendard, sans-serif;
  }
  html {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-size: 62.5%;
  }
  body {
    overflow-x: hidden;
  }
  body {
    -ms-overflow-style: none;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  button {
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
    &:disabled {
      cursor: not-allowed;
    }
  }
  input {
    border: none;
    :focus {
      outline: none;
    }
  }
  a {
    color: #fff;
    text-decoration: none;
    outline: none;
  }
  a:hover,
  a:active {
    text-decoration: none;
  }
`;

const GlobalStyle = () => <Global styles={globalStyle} />;

export default GlobalStyle;
