/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";

const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        button {
          background: none;
          border: none;
          cursor: pointer;
        }
      `}
    />
  );
};

export default GlobalStyles;
