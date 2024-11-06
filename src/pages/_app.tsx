import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';

import '@/styles/globals.css';
import { ThemeProvider } from '@mui/material/styles';
import React, { ReactElement, ReactNode, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { theme } from '@/styles/theme';
import NProgress from 'nprogress';

import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';
import { createConfig, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { mainnet } from 'viem/chains';
import Head from 'next/head';

const GlobalStyle = createGlobalStyle`
    * {
        -webkit-box-sizing:border-box;
        -moz-box-sizing:border-box;
        box-sizing:border-box;
    }
    html {
        scroll-behavior: smooth;
        -webkit-tap-highlight-color: transparent;
        body {
            margin: 0;
            font-size: 16px;
            font-weight: 400;
            color: #263238;
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
                font-weight: 700;
            }
        }
    }
  strong {
    font-weight: 700;
  }
    #nprogress {
        transition: all .8s ease-out !important;
        .bar {
            box-shadow: 0 0 10px red, 0 0 4px red;
            height: 1px;
            background: red;
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
`;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();
  useEffect(() => {
    NProgress.configure({ easing: 'ease-out', speed: 800 });
    NProgress.configure({ showSpinner: false });
    NProgress.configure({ trickleRate: 0.02, trickleSpeed: 800 });
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
        <meta property="og:site_name" content="Realm Of The Ethernal" />
        {/* <link rel="icon" type="image/x-icon" href="/icons/favicon.ico" /> */}
        <title>Realm Of The Ethernal</title>
      </Head>
      <DynamicContextProvider
        settings={{
          environmentId: 'ENV_ID',
          walletConnectors: [EthereumWalletConnectors],
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
