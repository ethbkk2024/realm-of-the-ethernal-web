import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { menuConfig } from '@/utils/menuConfig';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';

const AsideStyled = styled.div<{
  $isShow: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  position: fixed;
  opacity: 0;
  transform: translateX(20%);
  transition: 0.3s ease-out;
  visibility: hidden;
  z-index: 98;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background-color: #26323880;
  ${({ $isShow }) =>
    $isShow &&
    css`
      transform: translateX(0);
      opacity: 1;
      visibility: visible;
    `};
  .menu-wrap {
    padding: 86px 32px;
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    @media screen and (max-width: 430px) {
      padding: 86px 24px;
    }
    .menu {
      a {
        text-decoration: none;
        font-size: 16px;
        position: relative;
        color: white;
        .line-hov {
          width: 0;
          height: 4px;
          background-color: white;
          position: absolute;
          transition: 0.15s ease-out;
          opacity: 0;
          &.active {
            opacity: 1;
            width: 100%;
          }
        }
      }
    }
  }
  .btn-group {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    box-shadow: 0px 0px 16px 0px #00000014;
    border-radius: 24px;
    column-gap: 4px;
    overflow: hidden;
    position: absolute;
    bottom: 64px;
    left: 50%;
    transform: translateX(-50%);
    a {
      text-decoration: none;
      button {
        transition: 0.15s ease-out !important;
        color: white !important;
        overflow: hidden !important;
        height: 34px !important;
        padding: 6px 12px !important;
        white-space: nowrap; !important;
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
`;

type AsideProps = {
  isShow: boolean;
};
const Aside = (props: AsideProps) => {
  const { isShow } = props;
  const router = useRouter();
  const handleScroll = (url: string) => {
    // todo aside
    // dispatch(setShowAside(false));
    const element = document.getElementById(url);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <AsideStyled $isShow={isShow}>
      <div className="menu-wrap">
        {menuConfig.map((item: any, index: number) => (
          <React.Fragment key={index}>
            <div className="menu">
              <Link
                href={item.url}
                onClick={(e: any) => {
                  if (item.id !== 1) {
                    e.preventDefault();
                  }
                  handleScroll(item.url);
                }}
              >
                {item.name}
                <div
                  className={`line-hov ${
                    router.pathname === item.url && 'active'
                  }`}
                />
              </Link>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="btn-group">
        <Link href="#">
          <Button type="button" variant="contained" color="white">
            <div className="bg-gradient"></div>
            <div className="btn-text">SIGN UP</div>
          </Button>
        </Link>
        <Link href="#">
          <div className="bg"></div>
          <Button type="button" variant="contained" color="white">
            LOG IN
          </Button>
        </Link>
      </div>
    </AsideStyled>
  );
};

export default Aside;
