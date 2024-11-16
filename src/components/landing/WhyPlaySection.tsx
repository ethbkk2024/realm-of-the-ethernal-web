import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import Material from '@/components/Material';

const WhyPlaySectionStyled = styled.section<{
  $maxHeight: number;
}>`
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  position: relative;
  background: #7e75c5;
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    width: 1920px;
    max-width: 100%;
    .why-bg {
      position: absolute;
      z-index: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(0.3);
      z-index: 0;
    }
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
        z-index: 1;
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
            font-size: 32px;
            line-height: 1.2;
            @media screen and (max-width: 980px) {
              font-size: 28px;
            }
            @media screen and (max-width: 768px) {
              font-size: 24px;
            }
            @media screen and (max-width: 620px) {
              font-size: 20px;
            }
          }

          .description {
            max-width: 540px;
            font-size: 16px;
            color: white;
            @media screen and (max-width: 768px) {
              font-size: 14px;
            }
            @media screen and (max-width: 620px) {
              font-size: 12px;
            }
          }
        }

        .reason-group {
          width: 100%;
          display: grid;
          grid-template-rows: 1fr;
          grid-template-columns: auto;
          gap: 24px;
          .reason {
            display: flex;
            align-items: center;
            column-gap: 24px;
            @media screen and (max-width: 1382px) {
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
              font-size: 14px;
              color: white;
              @media screen and (max-width: 768px) {
                font-size: 12px;
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
        font-size: 88px;
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
    <WhyPlaySectionStyled $maxHeight={maxHeight} id="">
      <div className="content">
        <Image
          src="/images/bg-2.jpg"
          fill
          alt=""
          priority
          className="why-bg"
          draggable={false}
        />
        <div className="why-use-content-wrap">
          <div className="reason-zone">
            <div className="header-group">
              <h1 className="topic">Realm of the Eternal</h1>
              <p className="description">
                Discover a world of ancient secrets, powerful artifacts, and
                legendary quests in the Realm of the Eternal.
              </p>
            </div>
            <div className="reason-group">
              {/* Reason 1 */}
              <div className="reason">
                <div className="icon">
                  <Image
                    src="/icons/icon-nft-character.svg"
                    width="40"
                    height="40"
                    alt="NFT Character"
                    priority
                  />
                </div>
                <p className="text">
                  Unique NFT characters powered by NounsDAO, making each hero
                  truly yours.
                </p>
              </div>

              {/* Reason 2 */}
              <div className="reason">
                <div className="icon">
                  <Image
                    src="/icons/icon-web3-integration.svg"
                    width="40"
                    height="40"
                    alt="Web3 Integration"
                    priority
                  />
                </div>
                <p className="text">
                  Experience seamless Web3 integration with Filecoin, Uniswap,
                  and Sign Protocol for secure and immersive gameplay.
                </p>
              </div>

              {/* Reason 3 */}
              <div className="reason">
                <div className="icon">
                  <Image
                    src="/icons/icon-quest.svg"
                    width="40"
                    height="40"
                    alt="Epic Quests"
                    priority
                  />
                </div>
                <p className="text">
                  Embark on thrilling quests and defeat powerful bosses to
                  unlock rare artifacts and rewards.
                </p>
              </div>

              {/* Reason 4 */}
              <div className="reason">
                <div className="icon">
                  <Image
                    src="/icons/icon-marketplace.svg"
                    width="40"
                    height="40"
                    alt="Marketplace"
                    priority
                  />
                </div>
                <p className="text">
                  Buy, sell, and trade items and NFTs in the Realm Marketplace
                  to empower your character.
                </p>
              </div>

              {/* Reason 5 */}
              <div className="reason">
                <div className="icon">
                  <Image
                    src="/icons/icon-rewards.svg"
                    width="40"
                    height="40"
                    alt="Reward System"
                    priority
                  />
                </div>
                <p className="text">
                  Collect USDC, Realm Tokens, and exclusive NFT items from the
                  reward pool by completing quests and challenges.
                </p>
              </div>
            </div>
          </div>
          <Material />
        </div>
        <div className="marquee-vertical">
          <Marquee speed={60} autoFill={true} direction={marqueePosition}>
            <div className="text">REALM OF THE ETERNAL · NFT GAME &nbsp;</div>
          </Marquee>
        </div>
      </div>
    </WhyPlaySectionStyled>
  );
};

export default WhyPlaySection;
