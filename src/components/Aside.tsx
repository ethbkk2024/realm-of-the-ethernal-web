import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { menuConfig } from '@/utils/menuConfig';
import { useRouter } from 'next/router';
import { lazyLoadAside } from '@/styles/animations';
import { motion } from 'framer-motion';
import useAside from '@/stores/layout/aside/useAside';

const AsideStyled = styled.div<{
  $isShow: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  border-radius: 0 0 24px 24px;
  overflow: hidden;
  position: fixed;
  opacity: 0;
  visibility: hidden;
  z-index: 98;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background-color: #ffffff8a;
  * {
    font-size: 14px;
  }
  ${({ $isShow }) =>
    $isShow
      ? css`
          opacity: 1;
          visibility: visible;
          transition: 0.3s ease-out;
        `
      : css`
          transition: 0.3s ease-in;
        `};
  .menu-wrap {
    padding: 82px 24px 24px;
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    @media screen and (max-width: 480px) {
      padding: 78px 16px 16px;
    }
    .menu {
      a {
        text-decoration: none;
        font-weight: 700;
        position: relative;
        .line-hov {
          width: 0;
          height: 4px;
          background-color: #263238;
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
`;

const Aside = () => {
  const { open, onClickShowAside } = useAside();
  const router = useRouter();
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: Event) {
        const target = event.target as HTMLElement;
        const closeAside = Array.from(target.classList).includes('hamburger');
        if (!closeAside) {
          if (ref.current && !ref.current.contains(target)) {
            onClickShowAside(false);
          }
        }
      }

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <AsideStyled $isShow={open} ref={wrapperRef}>
      <div className="menu-wrap">
        {menuConfig.map((item: any, index: number) => (
          <React.Fragment key={index}>
            <motion.div
              className="menu"
              initial="offscreen"
              animate={open ? 'onscreen' : 'offscreen'}
              variants={lazyLoadAside(index)}
            >
              <Link
                href={item.url}
                onClick={() => {
                  onClickShowAside(false);
                }}
              >
                {item.name}
                <div
                  className={`line-hov ${
                    router.pathname === item.url ? 'active' : ''
                  }`}
                />
              </Link>
            </motion.div>
          </React.Fragment>
        ))}
      </div>
    </AsideStyled>
  );
};

export default Aside;
