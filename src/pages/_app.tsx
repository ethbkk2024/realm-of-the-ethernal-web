import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';

import '@/styles/globals.css';
import { ThemeProvider } from '@mui/material/styles';
import React, { ReactElement, ReactNode, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { theme } from '@/styles/theme';

import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';
import { createConfig, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { mainnet, optimism, base } from 'viem/chains';
import Head from 'next/head';
import { realmFont } from '@/styles/font';
import 'plyr/dist/plyr.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const GlobalStyle = createGlobalStyle`
  * {
    -webkit-box-sizing:border-box;
    -moz-box-sizing:border-box;
    box-sizing:border-box;
    font-family: ${realmFont.style.fontFamily} !important;
  }
  html {
    scroll-behavior: smooth;
    -webkit-tap-highlight-color: transparent;
    body {
      margin: 0;
      font-size: 12px;
      font-weight: 400;
      color: #263238;
     *{
       cursor: url('data:image/x-icon;base64,AAACAAEAICACAAAAAAAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAgAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAAPAAAADAAAAAwAAAA8AAAAPAAAADAAAAAwAAAM8AAADPAAAA/wAAAP8AAAD/wAAA/8AAAP8AAAD/AAAA/AAAAPwAAADwAAAA8AAAAMAAAADAAAAAAAAAAAAAAAAAAAAAAAAAA///////////////////////D////w////wD///8A////A////wP//zwD//88A///DA///wwP//8AD///AA///wAA//8AAP//AAP//wAD//8AD///AA///wA///8AP///AP///wD///8D////A////w////8P////P////z////8='), auto !important;
     }
      a {
        color: #263238;
      }
      p {
        margin: 12px 0;
        line-height: 1.8;
        white-space: pre-line;
      }
      ul,ol {
        @media screen and (max-width: 480px) {
          padding-inline-start: 24px;
        }
        li{
          line-height: 1.8;
          white-space: pre-line;
        }
      }
      ul {
        margin: 12px 0;
      }
      h1, h2, h3, h4, h5, h6 {
        margin: 0;
        font-weight: 600;
      }
    }
  }
  strong {
    font-weight: 600;
  }
  #nprogress {
    transition: all .8s ease-out;
    position: absolute;
    z-index: 109;
    top: 0;
    .bar {
      box-shadow: 0 0 10px #16D5C5, 0 0 4px #605DEC;
      height: 2px;
      background: #fd5394;
      animation: changeColor 2s ease-in-out infinite;
    }
  }
  .zoom-image {
    clip-path: inset(0 round 8px);
  }
  .medium-zoom-overlay {
    height: 100%;
    background: rgb(248 248 248 / 95%) !important;
  }
  .realm-name {
    background: linear-gradient(360deg, #FF0000, #FFFF00);
    background-size: 100% 120%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-animation 5s linear infinite;
  }

  @keyframes gradient-animation {
    0% {
      background-position: 0% 0%;
    }
    20% {
      background-position: 0% 25%;
    }
    50% {
      background-position: 0% 100%;
    }
    80% {
      background-position: 0% 25%;
    }
    100% {
      background-position: 0% 0%;
    }
  }
  .plyr--full-ui input[type='range'] {
    color: #b0a6ff;
    //filter: saturate(2);
  }
  .plyr__controls__item {
    background: none !important;
    button {
      background: none !important;
    }
  }
  .MuiTouchRipple-root {
    display: none !important;
  }
`;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const config = createConfig({
  chains: [mainnet, optimism, base],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
  },
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();
  useEffect(() => {
    NProgress.configure({
      easing: 'ease-out',
      speed: 300,
      showSpinner: false,
      trickleRate: 0.02,
      trickleSpeed: 800,
    });

    const routeChangeStartHandler = () => {
      NProgress.start();
    };

    const routeChangeEndHandler = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', routeChangeStartHandler);
    router.events.on('routeChangeComplete', routeChangeEndHandler);
    router.events.on('routeChangeError', routeChangeEndHandler);

    return () => {
      router.events.off('routeChangeStart', routeChangeStartHandler);
      router.events.off('routeChangeComplete', routeChangeEndHandler);
      router.events.off('routeChangeError', routeChangeEndHandler);
    };
  }, []);
  return (
    <>
      <GlobalStyle />
      <Head>
        <meta property="og:site_name" content="Realm Of The Eternal Archive" />
        {/* <link rel="icon" type="image/x-icon" href="/icons/favicon.ico" /> */}
        <title>Realm Of The Eternal Archive</title>
      </Head>
      <DynamicContextProvider
        settings={{
          environmentId: 'e1d804b8-4c7b-4a83-901e-86c8780b67d1',
          walletConnectors: [EthereumWalletConnectors],
          shadowDOMEnabled: false,
        }}
      >
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <DynamicWagmiConnector>
              <ThemeProvider theme={theme}>
                {getLayout(<Component {...pageProps} />)}
              </ThemeProvider>
            </DynamicWagmiConnector>
          </QueryClientProvider>
        </WagmiProvider>
      </DynamicContextProvider>
    </>
  );
}

export default MyApp;
