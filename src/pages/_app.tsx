import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';

import '@/styles/globals.css';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: url("/bg-5.png") no-repeat center;
    background-size: cover;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
