import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import HySellerSocialMaterial from '@/components/HySellerSocialMaterial';

const WhyPlaySectionStyled = styled.section<{
  $maxHeight: number;
}>`
  width: 1920px;
  max-width: 100%;
  overflow: hidden;
  position: relative;
  .why-use-content-wrap {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    gap: 24px;
    padding: 64px 40px;
    @media screen and (max-width: 1510px) {
      margin-bottom: 120px;
    }
    @media screen and (max-width: 1382px) {
      flex-direction: column-reverse;
      gap: 56px;
      margin-bottom: 74px;
      align-items: center;
    }
    @media screen and (max-width: 768px) {
      gap: 34px;
    }
    @media screen and (max-width: 620px) {
      padding: 52px 24px;
    }
    .reason-zone {
      display: flex;
      flex-direction: column;
      max-width: 832px;
      min-width: 640px;
      width: 42vw;
      row-gap: 24px;
      height: 100%;
      @media screen and (max-width: 1382px) {
        width: 100%;
        max-width: 100%;
        min-width: auto;
        row-gap: 42px;
      }
      .header-group {
        display: flex;
        flex-direction: column;
        column-gap: 8px;
        row-gap: 8px;
        .topic {
          color: #ffb7d2;
          font-size: 42px;
          line-height: 1.2;
          @media screen and (max-width: 980px) {
            font-size: 38px;
          }
          @media screen and (max-width: 768px) {
            font-size: 34px;
          }
          @media screen and (max-width: 620px) {
            font-size: 30px;
          }
        }
        .description {
          max-width: 540px;
          font-size: 24px;
          @media screen and (max-width: 980px) {
            font-size: 20px;
          }
          @media screen and (max-width: 768px) {
            font-size: 18px;
          }
          @media screen and (max-width: 620px) {
            font-size: 16px;
          }
        }
      }
      .reason-group {
        width: 100%;
        display: grid;
        gap: 12px;
        grid-template-rows: 1fr;
        grid-template-columns: auto;
        .reason {
          display: flex;
          align-items: center;
          column-gap: 24px;
          border-radius: 34px;
          background-color: #f0eeff;
          padding: 34px 24px;
          ${({ $maxHeight }) =>
            $maxHeight &&
            css`
              height: ${$maxHeight}px;
            `};
          @media screen and (max-width: 1382px) {
            padding: 20px;
            column-gap: 20px;
          }
          //@media screen and (max-width: 768px) {
          //  flex-direction: column;
          //  text-align: center;
          //}
          .icon {
            background-color: #d8d3ff;
            min-width: 68px;
            width: 68px;
            height: 68px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .text {
            font-size: 20px;
            @media screen and (max-width: 980px) {
              font-size: 18px;
            }
            @media screen and (max-width: 768px) {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
  .marquee-vertical {
    position: absolute;
    left: 50%;
    bottom: 50%;
    transform: translateX(-50%);
    @media screen and (max-width: 1510px) {
      bottom: 0;
    }
    .rfm-marquee-container {
      overflow: hidden;
      width: 2000px;
    }
    .text {
      font-size: 112px;
      -webkit-text-stroke: 1px #dbe2e5;
      -webkit-text-fill-color: transparent;
      rotate: 90deg;
      white-space: nowrap;
      @media screen and (max-width: 1510px) {
        rotate: 0deg;
      }
      @media screen and (max-width: 1382px) {
        font-size: 88px;
      }
    }
  }
`;
const WhyPlaySection = () => {
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [marqueePosition, setMarqueePosition] = useState<
    'up' | 'left' | 'right' | 'down'
  >('up');
  const [maxHeight, setMaxHeight] = useState<number>(0);
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
    if (screenWidth > 1510) {
      setMarqueePosition('up');
    } else if (screenWidth < 1510) {
      setMarqueePosition('left');
    }
  }, [screenWidth]);

  useEffect(() => {
    const reasons = document.querySelectorAll('.reason');
    let newMaxHeight = 0;
    reasons.forEach((reason) => {
      const reasonHeight = reason.getBoundingClientRect().height;
      if (reasonHeight > newMaxHeight) {
        newMaxHeight = reasonHeight;
      }
    });
    setMaxHeight(newMaxHeight);
  }, []);

  return (
    <WhyPlaySectionStyled $maxHeight={maxHeight} id="highlights">
      <div className="why-use-content-wrap">
        <div className="reason-zone">
          <div className="header-group">
            <h1 className="topic">Realm Of The Ethernal</h1>
            <p className="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="reason-group">
            <div className="reason">
              <div className="icon">
                <Image
                  src="/icons/icon-phone.svg"
                  width="40"
                  height="40"
                  alt=""
                  priority
                />
              </div>
              <p className="text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div className="reason">
              <div className="icon">
                <Image
                  src="/icons/icon-social-media.svg"
                  width="40"
                  height="40"
                  alt=""
                  priority
                />
              </div>
              <p className="text">
                Duis aute irure dolor in reprehenderit in voluptate velit esse.
              </p>
            </div>
            <div className="reason">
              <div className="icon">
                <Image
                  src="/icons/icon-camera.svg"
                  width="40"
                  height="40"
                  alt=""
                  priority
                />
              </div>
              <p className="text">
                Excepteur sint occaecat cupidatat non proident.
              </p>
            </div>
            <div className="reason">
              <div className="icon">
                <Image
                  src="/icons/icon-video.svg"
                  width="40"
                  height="40"
                  alt=""
                  priority
                />
              </div>
              <p className="text">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris.
              </p>
            </div>
            <div className="reason">
              <div className="icon">
                <Image
                  src="/icons/icon-shop.svg"
                  width="40"
                  height="40"
                  alt=""
                  priority
                />
              </div>
              <p className="text">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
              </p>
            </div>
          </div>
        </div>
        <HySellerSocialMaterial />
      </div>
      <div className="marquee-vertical">
        <Marquee speed={60} autoFill={true} direction={marqueePosition}>
          <div className="text">REALM OF THE ETHERNAL NFT · GAME &nbsp;</div>
        </Marquee>
      </div>
    </WhyPlaySectionStyled>
  );
};

export default WhyPlaySection;
