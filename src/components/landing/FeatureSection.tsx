import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Button } from '@mui/material';
import Image from 'next/image';

const FeatureSectionStyled = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #263238;
  .feature-content {
    padding: 64px 40px;
    width: 1920px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 768px) {
      padding: 40px;
    }
    @media screen and (max-width: 620px) {
      padding: 40px 24px;
    }
    .feature-text {
      color: #fd5394;
      font-size: 32px;
      width: 100%;
      line-height: 1.4;
      @media screen and (max-width: 980px) {
        font-size: 24px;
      }
      @media screen and (max-width: 768px) {
        font-size: 20px;
      }
      @media screen and (max-width: 620px) {
        font-size: 16px;
      }
    }
    .header-zone {
      display: flex;
      justify-content: space-between;
      width: 100%;
      align-items: center;
      flex-wrap: wrap;
      column-gap: 100px;
      row-gap: 24px;
      @media screen and (max-width: 768px) {
        row-gap: 16px;
      }
      .title {
        font-size: 32px;
        margin: 0;
        color: #5149f2;
        line-height: 1.4;
        @media screen and (max-width: 980px) {
          font-size: 24px;
        }
        @media screen and (max-width: 768px) {
          font-size: 20px;
        }
        @media screen and (max-width: 620px) {
          font-size: 16px;
        }
      }
      .btn {
        display: block;
        a {
          button {
            border-radius: 0 !important;
            transition: 0.15s ease-out;
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
            font-size: 12px !important;
            min-height: 38px !important;
            padding: 0 64px 0 32px !important;
            white-space: nowrap !important;
            img {
              position: absolute;
              right: 16px;
            }
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
            transition: none;
          }
        }
      }
    }

    .feature-grid {
      width: 100%;
      display: grid;
      gap: 48px;
      grid-template-columns: repeat(auto-fill, minmax(434px, 1fr));
      margin-top: 46px;
      //place-items: center;
      @media screen and (max-width: 1000px) {
        grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      }
      @media screen and (max-width: 768px) {
        margin-top: 40px;
      }
      @media screen and (max-width: 420px) {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      }
      @media screen and (max-width: 325px) {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }
      .feature {
        display: flex;
        flex-direction: column;
        row-gap: 12px;
        .feature-topic {
          display: flex;
          align-items: center;
          column-gap: 16px;
          @media screen and (max-width: 980px) {
            column-gap: 14px;
          }
          @media screen and (max-width: 768px) {
            column-gap: 12px;
          }
          @media screen and (max-width: 620px) {
            column-gap: 10px;
          }
          .feature-topic-text {
            color: white;
            font-size: 18px;
            @media screen and (max-width: 768px) {
              font-size: 14px;
            }
          }
          img {
            @media screen and (max-width: 980px) {
              width: 40px;
              height: 40px;
            }
            @media screen and (max-width: 768px) {
              width: 38px;
              height: 38px;
            }
            @media screen and (max-width: 620px) {
              width: 34px;
              height: 34px;
            }
          }
        }
        .feature-p {
          color: white;
          font-size: 14px;
          @media screen and (max-width: 620px) {
            font-size: 12px;
          }
        }
      }
    }
  }
`;
const FeatureSection = () => {
  return (
    <FeatureSectionStyled id="feature">
      <div className="feature-content">
        <h1 className="feature-text">KEY FEATURES</h1>
        <div className="header-zone">
          <p className="title">Realm Of The Eternal Archive</p>
          <div className="btn">
            <Link href="#">
              <Button type="button" variant="contained" color="white">
                <span>Start the Adventure</span>
                <Image
                  src="/icons/icon-arrow-right-black.svg"
                  width={32}
                  height={32}
                  alt=""
                  priority
                />
              </Button>
            </Link>
          </div>
        </div>

        <div className="feature-grid">
          {/* Feature 1 */}
          <div className="feature">
            <div className="feature-topic">
              <Image
                src="/icons/icon-nft-character.svg"
                width={44}
                height={44}
                alt=""
                priority
              />
              <h2 className="feature-topic-text">NFT Character Creation</h2>
            </div>
            <p className="feature-p">
              Create a unique NFT character through NounsDAO to represent
              yourself in the game world.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="feature">
            <div className="feature-topic">
              <Image
                src="/icons/icon-web3-integration.svg"
                width={44}
                height={44}
                alt=""
                priority
              />
              <h2 className="feature-topic-text">Web3 Integrations</h2>
            </div>
            <p className="feature-p">
              Integrates with Web3 technologies like Filecoin, Sign Protocol,
              and Uniswap for seamless and secure gameplay.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="feature">
            <div className="feature-topic">
              <Image
                src="/icons/icon-quests.svg"
                width={44}
                height={44}
                alt=""
                priority
              />
              <h2 className="feature-topic-text">Epic Quest System</h2>
            </div>
            <p className="feature-p">
              Embark on quests like Filecoin Storage, Sign Protocol, and Uniswap
              Trade to earn rare items and powerful boosts.
            </p>
          </div>
          {/* Feature 4 */}
          <div className="feature">
            <div className="feature-topic">
              <Image
                src="/icons/icon-boss-battle.svg"
                width={44}
                height={44}
                alt=""
                priority
              />
              <h2 className="feature-topic-text">Challenging Boss Battles</h2>
            </div>
            <p className="feature-p">
              Fight powerful bosses in each level, from the Forest Guardian to
              the Dragon Emperor, and earn exclusive rewards.
            </p>
          </div>
          {/* Feature 5 */}
          <div className="feature">
            <div className="feature-topic">
              <Image
                src="/icons/icon-marketplace.svg"
                width={44}
                height={44}
                alt=""
                priority
              />
              <h2 className="feature-topic-text">NFT Marketplace</h2>
            </div>
            <p className="feature-p">
              Buy, sell, and trade items and NFTs in the Realm Marketplace to
              enhance your character's strength.
            </p>
          </div>
          {/* Feature 6 */}
          <div className="feature">
            <div className="feature-topic">
              <Image
                src="/icons/icon-rewards.svg"
                width={44}
                height={44}
                alt=""
                priority
              />
              <h2 className="feature-topic-text">Reward Pool System</h2>
            </div>
            <p className="feature-p">
              Earn USDC, Realm Tokens, and exclusive NFT items through gameplay
              achievements and contributions to the pool.
            </p>
          </div>
        </div>
      </div>
    </FeatureSectionStyled>
  );
};

export default FeatureSection;
