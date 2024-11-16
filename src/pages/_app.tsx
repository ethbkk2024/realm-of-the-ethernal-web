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
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Head from 'next/head';
import { realmFont } from '@/styles/font';
import 'plyr/dist/plyr.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Alert, Snackbar } from '@mui/material';
import useSnackbar from '@/stores/layout/snackbar/useSnackbar';
import { config } from '@/utils/config';

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
  .plyr {
    height: 450px;
    video {
      object-fit: cover;
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
  .modal {
    width: 480px !important;
    max-width: 100% !important;
    *{
      font-size: 10px !important;
      .typography {
        line-height: 1.8;
      }
    }
    .badge__container {
      *{
        font-size: 8px !important;
      }
    }
  }
  .badge__dot {
    display: none !important;
  }
  .dynamic-widget-modal {
    width: 600px !important;
    max-width: 100% !important;
    *{
      font-size: 10px !important;
      .typography {
        line-height: 1.8;
      }
    }
    .non-widget-network-picker {
      display: flex;
      align-items: center;
    }
    .active-wallet-information__network-picker {
      display: flex;
      align-items: center;
    }
    .active-wallet-information__address-container {
      >div:first-child {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }
    .active-wallet-information__header {
      align-items: center;
    }
    .active-wallet-information__details {
      flex-wrap: wrap;
      column-gap: .5rem;
      row-gap: 0;
    }
    .user-profile-section__header {
      align-items: center;
      margin-bottom: 16px;
      *{
        margin: 0;
      }
    }
    .user-profile-field {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      row-gap: 8px;
      p {
        margin: 0;
      }
    }
  }
  .MuiAlert-message {
      font-size: 10px !important;
  }
`;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();
  const { snackBar, openSnackbar } = useSnackbar((state) => state);

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
      <Snackbar
        open={snackBar.open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => {
          openSnackbar({ ...snackBar, open: false });
        }}
      >
        <Alert
          onClose={() => {
            openSnackbar({ ...snackBar, open: false });
          }}
          severity={snackBar.severity}
        >
          {snackBar.text}
        </Alert>
      </Snackbar>
      <Head>
        <meta property="og:site_name" content="Realm Of The Eternal" />
        {/* <link rel="icon" type="image/x-icon" href="/icons/favicon.ico" /> */}
        <title>Realm Of The Eternal</title>
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
