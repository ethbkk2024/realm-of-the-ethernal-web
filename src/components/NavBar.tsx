import styled, { css } from 'styled-components';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { menuConfig } from '@/utils/menuConfig';
import { IconButton } from '@mui/material';
import Image from 'next/image';
import Aside from '@/components/Aside';
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { useAccount } from 'wagmi';
import { LoadElement } from '@/styles/animations';
import { useRouter } from 'next/router';
import useAside from '@/stores/layout/aside/useAside';

const NavStyle = styled.div<{
  $isShow: boolean;
  $scrollDirection: string;
  $scrollYPosition: number;
}>`
  position: fixed;
  top: 0;
  ${({ $isShow }) =>
    $isShow
      ? css`
          top: 0 !important;
        `
      : css`
          top: 0;
        `};
  height: 88px;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 24px;
  box-shadow: 0 8px 8px -8px rgba(0, 0, 0, 0.5);
  z-index: 99;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background-color: #00000050;
  transition: 0.3s ease-out;
  ${({ $scrollDirection, $scrollYPosition }) => {
    if ($scrollDirection === 'down' && $scrollYPosition >= 80) {
      return css`
        top: -88px;
      `;
    }
    return css`
      top: 0;
    `;
  }};

  @media screen and (max-width: 980px) {
    height: 62px;
    ${({ $scrollDirection, $scrollYPosition }) => {
      if ($scrollDirection === 'down' && $scrollYPosition >= 62) {
        return css`
          top: -62px;
        `;
      }
      return css`
        top: 0;
      `;
    }};
  }
  nav {
    display: flex;
    align-items: center;
    width: 1920px;
    max-width: 100%;
    margin: 0 auto;
    justify-content: space-between;
    a {
      text-decoration: none;
    }
    .hamburger-wrap {
      align-items: center;
      justify-content: center;
      display: none;
      @media screen and (max-width: 980px) {
        display: flex;
      }
      button {
        padding: 0;
      }
      .hamburger {
        height: 40px;
        width: 40px;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        display: flex;
        padding: 10px 0;
        cursor: pointer;
        position: relative;
        border-radius: 8px;
        ${({ $isShow }) =>
          $isShow &&
          css`
            justify-content: center;
          `};

        &:before {
          content: '';
          width: 28px;
          height: 2px;
          background-color: white;
          border-radius: 8px;
          transition: 0.3s linear;
          ${({ $isShow }) =>
            $isShow &&
            css`
              position: absolute;
              rotate: 45deg;
              width: 28px;
            `};
        }
        &:after {
          content: '';
          width: 28px;
          height: 2px;
          background-color: white;
          border-radius: 8px;
          transition: 0.3s linear;
          ${({ $isShow }) =>
            $isShow &&
            css`
              position: absolute;
              rotate: -45deg;
              width: 28px;
            `};
        }
        .beef {
          width: 28px;
          height: 2px;
          background-color: white;
          border-radius: 8px;
          transition: 0.3s linear;
          ${({ $isShow }) =>
            $isShow &&
            css`
              position: absolute;
              width: 0;
            `};
        }
      }
    }
    ul {
      display: flex;
      align-items: center;
      margin: 0;
      background: #2632384f;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      height: 34px;
      box-shadow:
        0px 0px 0px 2px white,
        2px 2px 0px 0px #9d90ff,
        -2px 2px 0px 0px #9d90ff,
        2px -2px 0px 0px #9d90ff,
        -2px -2px 0px 0px #9d90ff,
        4px 0px 0px 0px white,
        -4px 0px 0px 0px white,
        0px 4px 0px 0px white,
        0px -4px 0px 0px white,
        inset 0px 0px 0px 4px #897de0,
        inset 4px 4px 0px 0px white,
        inset -4px 4px 0px 0px white,
        inset 4px -4px 0px 0px white,
        inset -4px -4px 0px 0px white;
      &:hover {
        box-shadow:
          0px 0px 0px 4px white,
          4px 4px 0px 0px #9d90ff,
          -4px 4px 0px 0px #9d90ff,
          4px -4px 0px 0px #9d90ff,
          -4px -4px 0px 0px #9d90ff,
          8px 0px 0px 0px white,
          -8px 0px 0px 0px white,
          0px 8px 0px 0px white,
          0px -8px 0px 0px white,
          inset 0px 0px 0px 4px #897de0,
          inset 4px 4px 0px 0px white,
          inset -4px 4px 0px 0px white,
          inset 4px -4px 0px 0px white,
          inset -4px -4px 0px 0px white;
      }
      @media screen and (max-width: 980px) {
        display: none;
      }
      li {
        list-style-type: none;
        position: relative;
        white-space: nowrap;
        padding: 0 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 24px;
        transition: 0.3s ease-out;
        &:first-child {
          margin-left: 5px;
        }
        &:last-child {
          margin-right: 5px;
        }
        &:hover {
          background: #263238;
        }
        .active {
          height: 100%;
          width: 100%;
          background: #9d90ff;
          position: absolute;
        }
        a {
          text-decoration: none;
          position: relative;
          z-index: 9;
        }
      }
    }
    .l-wrap {
      display: flex;
      align-items: center;
      column-gap: 12px;
      cursor: pointer;
      @media screen and (max-width: 1150px) {
        img {
          width: 40px;
        }
      }
      @media screen and (max-width: 980px) {
        img {
          width: 34px;
        }
      }
    }
    .r-wrap {
      display: flex;
      align-items: center;
      column-gap: 32px;
      @media screen and (max-width: 980px) {
        display: none;
      }
      .dynamic-widget-inline-controls {
        animation: ${LoadElement} 0.3s ease-in;
        border-radius: 0 !important;
        height: 34px;
        box-shadow:
          0px 0px 0px 2px white,
          2px 2px 0px 0px #9d90ff,
          -2px 2px 0px 0px #9d90ff,
          2px -2px 0px 0px #9d90ff,
          -2px -2px 0px 0px #9d90ff,
          4px 0px 0px 0px white,
          -4px 0px 0px 0px white,
          0px 4px 0px 0px white,
          0px -4px 0px 0px white,
          inset 0px 0px 0px 4px #897de0,
          inset 4px 4px 0px 0px white,
          inset -4px 4px 0px 0px white,
          inset 4px -4px 0px 0px white,
          inset -4px -4px 0px 0px white;
        &:hover {
          box-shadow:
            0px 0px 0px 4px white,
            4px 4px 0px 0px #9d90ff,
            -4px 4px 0px 0px #9d90ff,
            4px -4px 0px 0px #9d90ff,
            -4px -4px 0px 0px #9d90ff,
            8px 0px 0px 0px white,
            -8px 0px 0px 0px white,
            0px 8px 0px 0px white,
            0px -8px 0px 0px white,
            inset 0px 0px 0px 4px #897de0,
            inset 4px 4px 0px 0px white,
            inset -4px 4px 0px 0px white,
            inset 4px -4px 0px 0px white,
            inset -4px -4px 0px 0px white;
        }
        * {
          font-size: 10px !important;
        }
      }
      .account-control__container {
        display: flex;
        height: 34px;
      }
      .evm-network-control__container {
        display: flex;
        height: 34px;
      }
      .connect-button-custom {
        all: unset;
        height: 34px;
        padding: 0 16px;
        background: #9d90ff;
        position: relative;
        cursor: pointer;
        animation: ${LoadElement} 0.3s ease-in;
        box-shadow:
          0px 0px 0px 2px white,
          2px 2px 0px 0px #9d90ff,
          -2px 2px 0px 0px #9d90ff,
          2px -2px 0px 0px #9d90ff,
          -2px -2px 0px 0px #9d90ff,
          4px 0px 0px 0px white,
          -4px 0px 0px 0px white,
          0px 4px 0px 0px white,
          0px -4px 0px 0px white,
          inset 0px 0px 0px 4px #897de0,
          inset 4px 4px 0px 0px white,
          inset -4px 4px 0px 0px white,
          inset 4px -4px 0px 0px white,
          inset -4px -4px 0px 0px white;
        &:hover {
          background: #897de0;
          box-shadow:
            0px 0px 0px 4px white,
            4px 4px 0px 0px #9d90ff,
            -4px 4px 0px 0px #9d90ff,
            4px -4px 0px 0px #9d90ff,
            -4px -4px 0px 0px #9d90ff,
            8px 0px 0px 0px white,
            -8px 0px 0px 0px white,
            0px 8px 0px 0px white,
            0px -8px 0px 0px white,
            inset 0px 0px 0px 4px #897de0,
            inset 4px 4px 0px 0px white,
            inset -4px 4px 0px 0px white,
            inset 4px -4px 0px 0px white,
            inset -4px -4px 0px 0px white;
        }
        .typography {
          color: white;
          font-size: 12px;
        }
      }

      .btn-group {
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px;
        box-shadow: 0px 0px 16px 0px #00000014;
        border-radius: 24px;
        column-gap: 4px;
        position: relative;
        overflow: hidden;
        @media screen and (max-width: 1150px) {
          height: 40px;
        }
        a {
          text-decoration: none;
          button {
            transition: 0.15s ease-out !important;
            color: white;
            overflow: hidden;
            @media screen and (max-width: 1150px) {
              height: 34px !important;
              padding: 6px 12px;
            }
            .btn-text {
              z-index: 1;
            }
            .bg-gradient {
              background: linear-gradient(
                90deg,
                rgba(59, 0, 102, 1) 20%,
                rgba(0, 56, 94, 1) 100%
              );
              filter: brightness(2);
              width: 200%;
              height: 100%;
              position: absolute;
              transition: 0.15s ease-out;
            }
          }
          &:first-child {
            button {
              &:hover {
                .bg-gradient {
                  transform: translateX(-25%);
                  filter: brightness(2) saturate(1.5);
                }
              }
            }
          }
          &:nth-child(2) {
            button {
              color: #263238 !important;
              background: transparent !important;
              position: initial !important;
            }
            &:hover {
              overflow: visible !important;
              button {
                color: white !important;
              }
              .bg {
                background: #9d90ff !important;
              }
            }
            .bg {
              position: absolute;
              width: 100%;
              height: 100%;
              background: #d8d3ff;
              left: 0;
              top: 0;
              z-index: -1;
              transition: 0.15s ease-out !important;
            }
          }
        }
      }
    }
  }
`;

const NavBar = () => {
  const router = useRouter();
  const { address, isConnected, chain } = useAccount();
  const { open, onClickShowAside } = useAside();
  const [scrollDirection, setScrollDirection] = useState('');
  const [scrollYPosition, setScrollYPosition] = useState(0);
  const [screenWidth, setScreenWidth] = useState<number>(0);
  console.log('address', address);
  console.log('isConnected', isConnected);
  console.log('chain', chain);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (screenWidth >= 980) {
      onClickShowAside(false);
    }
  }, [screenWidth]);
  useEffect(() => {
    const handleScroll = () => {
      const newYPosition = window.scrollY;
      setScrollYPosition(newYPosition);
      setScrollDirection(newYPosition > scrollYPosition ? 'down' : 'up');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollYPosition]);

  const handleScroll = (url: string) => {
    const element = document.getElementById(url);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <>
      <NavStyle
        $isShow={open}
        $scrollDirection={scrollDirection}
        $scrollYPosition={scrollYPosition}
      >
        <nav>
          <Link href={`#`}>
            <div className="l-wrap">
              <Image src="" width="42" height="48" alt="" priority />
            </div>
          </Link>
          <div className="hamburger-wrap">
            <IconButton
              onClick={() => {
                onClickShowAside(!open);
              }}
            >
              <div className="hamburger">
                <div className="beef" />
              </div>
            </IconButton>
          </div>
          <ul>
            {menuConfig.map((item: any, index: number) => (
              <React.Fragment key={index}>
                <li>
                  <Link
                    href={item.url}
                    style={{
                      color: 'white',
                    }}
                    onClick={async (e: any) => {
                      e.preventDefault();
                      if (item.sectionId !== null) {
                        handleScroll(item.sectionId);
                      } else {
                        await router.push(item.url);
                      }
                    }}
                  >
                    {item.name}
                  </Link>
                  <div
                    className={router.pathname === item.url ? 'active' : ''}
                  />
                </li>
              </React.Fragment>
            ))}
          </ul>
          <div className="r-wrap">
            <DynamicWidget buttonClassName={'connect-button-custom'} />
            {/* <div className="btn-group"> */}
            {/*  <Link */}
            {/*    href={`#`} */}
            {/*    onClick={(e: any) => { */}
            {/*      e.preventDefault(); */}
            {/*    }} */}
            {/*  > */}
            {/*    <Button type="button" variant="contained" color="white"> */}
            {/*      <div className="bg-gradient"></div> */}
            {/*      <div className="btn-text"> */}
            {/*        {isConnected ? 'Connected' : 'Connect'} */}
            {/*      </div> */}
            {/*    </Button> */}
            {/*  </Link> */}
            {/*  <Link */}
            {/*    href={`#`} */}
            {/*    onClick={(e: any) => { */}
            {/*      e.preventDefault(); */}
            {/*    }} */}
            {/*  > */}
            {/*    <div className="bg"></div> */}
            {/*    <Button type="button" variant="contained" color="white"> */}
            {/*      Verify */}
            {/*    </Button> */}
            {/*  </Link> */}
            {/* </div> */}
          </div>
        </nav>
      </NavStyle>
      <Aside />
    </>
  );
};

export default NavBar;
