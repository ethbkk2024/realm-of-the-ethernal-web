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
      font-size: 40px;
      width: 100%;
      line-height: 1.4;
      @media screen and (max-width: 980px) {
        font-size: 34px;
      }
      @media screen and (max-width: 768px) {
        font-size: 30px;
      }
      @media screen and (max-width: 620px) {
        font-size: 26px;
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
        font-size: 42px;
        margin: 0;
        color: #5149f2;
        line-height: 1.4;
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
      .btn {
        display: block;
        a {
          button {
            font-size: 20px !important;
            min-height: 52px !important;
            border-radius: 32px !important;
            padding: 0 64px 0 32px !important;
            white-space: nowrap !important;
            @media screen and (max-width: 768px) {
              font-size: 18px !important;
            }
            @media screen and (max-width: 620px) {
              font-size: 16px !important;
              min-height: 48px !important;
              max-height: 48px !important;
              padding: 0 62px 0 26px !important;
            }
            img {
              position: absolute;
              right: 16px;
            }
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
            font-size: 28px;
            @media screen and (max-width: 980px) {
              font-size: 26px;
            }
            @media screen and (max-width: 768px) {
              font-size: 24px;
            }
            @media screen and (max-width: 620px) {
              font-size: 20px;
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
          font-size: 18px;
          @media screen and (max-width: 620px) {
            font-size: 16px;
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
        <h1 className="feature-text">FEATURE</h1>
        <div className="header-zone">
          <p className="title">Realm Of The Ethernal</p>
          <div className="btn">
            <Link href="#">
              <Button type="button" variant="contained" color="white">
                <span>Start the game</span>
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
          <div className="feature">
            <div className="feature-topic">
              <Image
                src="/icons/icon-dvr.svg"
                width={44}
                height={44}
                alt=""
                priority
              />
              <h2 className="feature-topic-text">Lorem ipsum dolor sit amet</h2>
            </div>
            <p className="feature-p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero. Sed cursus ante dapibus diam.
            </p>
          </div>
          <div className="feature">
            <div className="feature-topic">
              <Image
                src="/icons/icon-encrypted.svg"
                width={44}
                height={44}
                alt=""
                priority
              />
              <h2 className="feature-topic-text">
                Curabitur suscipit suscipit tellus
              </h2>
            </div>
            <p className="feature-p">
              Curabitur suscipit suscipit tellus. Praesent adipiscing. Phasellus
              accumsan cursus velit. Vestibulum ante ipsum primis.
            </p>
          </div>
          <div className="feature">
            <div className="feature-topic">
              <Image
                src="/icons/icon-receipt.svg"
                width={44}
                height={44}
                alt=""
                priority
              />
              <h2 className="feature-topic-text">Morbi lectus risus</h2>
            </div>
            <p className="feature-p">
              Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.
              Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum.
            </p>
          </div>
          <div className="feature">
            <div className="feature-topic">
              <Image
                src="/icons/icon-order.svg"
                width={44}
                height={44}
                alt=""
                priority
              />
              <h2 className="feature-topic-text">Suspendisse potenti</h2>
            </div>
            <p className="feature-p">
              Suspendisse potenti. Cras in purus eu magna vulputate luctus.
              Mauris vel urna nec nisi mollis placerat.
            </p>
          </div>
          <div className="feature">
            <div className="feature-topic">
              <Image
                src="/icons/icon-box.svg"
                width={44}
                height={44}
                alt=""
                priority
              />
              <h2 className="feature-topic-text">In hac habitasse platea</h2>
            </div>
            <p className="feature-p">
              In hac habitasse platea dictumst. Proin quis tortor orci. Etiam at
              risus et justo dignissim congue.
            </p>
          </div>
          <div className="feature">
            <div className="feature-topic">
              <Image
                src="/icons/icon-notes.svg"
                width={44}
                height={44}
                alt=""
                priority
              />
              <h2 className="feature-topic-text">Vivamus vestibulum</h2>
            </div>
            <p className="feature-p">
              Vivamus vestibulum ntulla nec ante. Praesent placerat risus quis
              eros. Fusce pellentesque suscipit nibh.
            </p>
          </div>
        </div>
      </div>
    </FeatureSectionStyled>
  );
};

export default FeatureSection;
