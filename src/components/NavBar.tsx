import styled, { css } from 'styled-components';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { menuConfig } from '@/utils/menuConfig';
import { Button, IconButton } from '@mui/material';
import Image from 'next/image';
import Aside from '@/components/Aside';

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
  box-shadow: 0 8px 8px -8px rgba(0, 0, 0, 0.16);
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
      column-gap: 8px;
      margin: 0;
      background: #2632384f;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      height: 48px;
      border-radius: 24px;
      padding: 4px;
      @media screen and (max-width: 1150px) {
        height: 40px;
        column-gap: 4px;
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
        height: 40px;
        border-radius: 20px;
        transition: 0.3s ease-out;
        @media screen and (max-width: 1150px) {
          height: 34px;
          padding: 0 12px;
        }
        &:hover {
          background: #263238;
        }
        .active {
          height: 100%;
          width: 100%;
          background: white;
          position: absolute;
          border-radius: 20px;
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
      .hy-text {
        font-size: 32px;
        color: white;
        @media screen and (max-width: 1150px) {
          font-size: 28px;
        }
        @media screen and (max-width: 980px) {
          font-size: 24px;
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
                rgba(81, 73, 242, 1) 20%,
                rgba(253, 83, 148, 1) 100%
              );
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
  const [scrollDirection, setScrollDirection] = useState('');
  const [scrollYPosition, setScrollYPosition] = useState(0);
  const [screenWidth, setScreenWidth] = useState<number>(0);
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
      // todo aside
      // dispatch(setShowAside(false));
    }
  }, [screenWidth]);
  useEffect(() => {
    const handleScroll = () => {
      const newYPosition = window.scrollY;

      setScrollYPosition(newYPosition);

      if (newYPosition > scrollYPosition) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollYPosition]);
  const handleScroll = (url: string) => {
    const element = document.getElementById(url);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <NavStyle
        $isShow={
          // todo aside
          false
        }
        $scrollDirection={scrollDirection}
        $scrollYPosition={scrollYPosition}
      >
        <nav>
          <Link href={`#`}>
            <div className="l-wrap">
              <Image
                src="/icons/icon-hy-seller.svg"
                width="42"
                height="48"
                alt=""
                priority
              />
              <div className="hy-text">Realm Of The Ethernal</div>
            </div>
          </Link>
          <div className="hamburger-wrap">
            <IconButton
              onClick={() => {
                // todo aside
                // dispatch(setShowAside(!showAside));
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
                      color: router.pathname === item.url ? '#263238' : 'white',
                    }}
                    onClick={(e: any) => {
                      if (item.id !== 1) {
                        e.preventDefault();
                      }
                      handleScroll(item.url);
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
            <div className="btn-group">
              <Link href={`#`}>
                <Button type="button" variant="contained" color="white">
                  <div className="bg-gradient"></div>
                  <div className="btn-text">Connect</div>
                </Button>
              </Link>
              <Link href={`#`}>
                <div className="bg"></div>
                <Button type="button" variant="contained" color="white">
                  Verify
                </Button>
              </Link>
            </div>
          </div>
        </nav>
      </NavStyle>
      <Aside
        isShow={
          // todo aside
          false
        }
      />
    </>
  );
};

export default NavBar;
