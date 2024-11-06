import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import HyActionButton from '@/components/HyActionButton';

const FooterStyled = styled.footer`
  width: 100%;
  background-color: #263238;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  .pattern-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    img {
      &:nth-child(1) {
        transform: translateY(-25%);
      }
      &:nth-child(2) {
        transform: translateY(25%);
      }
    }
  }
  .content-footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 88px 40px 88px 40px;
    row-gap: 24px;
    z-index: 1;
    @media screen and (max-width: 768px) {
      button {
        width: 274px;
        font-size: 18px !important;
      }
    }
    @media screen and (max-width: 620px) {
      padding: 40px 24px 24px;
      button {
        width: 250px;
        font-size: 16px !important;
        height: 48px !important;
        .drop {
          width: 34px;
          height: 34px;
        }
      }
    }
    .footer-logo {
      margin-bottom: -16px;
    }
    .footer-title {
      text-align: center;
      font-size: 42px;
      color: white;
      @media screen and (max-width: 980px) {
        font-size: 40px;
      }
      @media screen and (max-width: 768px) {
        font-size: 38px;
      }
      @media screen and (max-width: 620px) {
        font-size: 34px;
      }
    }
    .footer-description {
      color: white;
      font-size: 28px;
      text-align: center;
      @media screen and (max-width: 980px) {
        font-size: 22px;
      }
      @media screen and (max-width: 768px) {
        font-size: 18px;
      }
    }
    .social-media-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 40px;
      flex-wrap: wrap;
      row-gap: 16px;
      @media screen and (max-width: 620px) {
        column-gap: 24px;
      }
      .circle {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: #7a6af4;
        cursor: pointer;
        transition: 0.3s ease-out;
        @media screen and (max-width: 980px) {
          width: 40px;
          height: 40px;
          img {
            width: 24px;
            height: 24px;
          }
        }
        @media screen and (max-width: 620px) {
          width: 34px;
          height: 34px;
          img {
            width: 20px;
            height: 20px;
          }
        }
        &:hover {
          filter: brightness(0.9);
        }
      }
    }
  }
  .copyright-bar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 74px;
    border-top: 1px solid #b0bec5;
    padding: 24px 40px;
    column-gap: 64px;
    flex-wrap: wrap;
    row-gap: 8px;
    overflow: hidden;
    @media screen and (max-width: 1075px) {
      flex-direction: column;
    }
    @media screen and (max-width: 620px) {
      padding: 24px;
    }
    .copyright {
      color: #b0bec5;
      overflow: hidden;
      display: flex;
      justify-content: center;
      text-align: center;
      @media screen and (max-width: 914px) {
        font-size: 14px;
        width: 100%;
      }
    }
    .about {
      color: #b0bec5;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      @media screen and (max-width: 914px) {
        width: 100%;
      }
      ul {
        padding: 0;
        margin: 0;
        overflow: hidden;
        li {
          list-style-type: none;
          display: flex;
          column-gap: 16px;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          row-gap: 2px;
          @media screen and (max-width: 914px) {
            column-gap: 8px;
          }
          @media screen and (max-width: 450px) {
            width: 300px;
          }
          @media screen and (max-width: 360px) {
            width: auto;
          }
          .about-group {
            display: flex;
            align-items: center;
            column-gap: 16px;
            @media screen and (max-width: 914px) {
              column-gap: 8px;
            }
            a {
              text-decoration: none;
              position: relative;
              color: #b0bec5;
              z-index: 9;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              @media screen and (max-width: 914px) {
                font-size: 14px;
              }
            }
            .marker {
              width: 2px;
              height: 2px;
              border-radius: 50%;
              background-color: #b0bec5;
            }
          }
        }
      }
    }
  }
`;

const Footer = () => {
  return (
    <FooterStyled id="about-us">
      <div className="pattern-wrap">
        <Image src="/images/footer-pattern-top.svg" fill alt="" priority />
        <Image src="/images/footer-pattern-bottom.svg" fill alt="" priority />
      </div>
      <div className="content-footer">
        <div className="footer-logo">
          <Image
            src="/icons/icon-hy-seller.svg"
            width="82"
            height="94"
            alt=""
            priority
          />
        </div>
        <div className="footer-title">Realm Of The Ethernal</div>
        <Link href={`#`}>
          <HyActionButton
            text="Start the game"
            boxShadow="0px 0px 0px 2px white inset !important"
            height={56}
            fontSize={20}
            dropRight={8}
            dropColor={'gradient'}
            width={290}
          />
        </Link>
        <div className="footer-description">
          Incididunt voluptate exercitation in.
        </div>
        <div className="social-media-wrap">
          <div className="circle">
            <Image
              src="/icons/icon-facebook.svg"
              width="24"
              height="24"
              alt=""
              priority
            />
          </div>
          <div className="circle">
            <Image
              src="/icons/icon-youtube.svg"
              width="24"
              height="24"
              alt=""
              priority
            />
          </div>
          <div className="circle">
            <Image
              src="/icons/icon-line.svg"
              width="24"
              height="24"
              alt=""
              priority
            />
          </div>
          <div className="circle">
            <Image
              src="/icons/icon-tiktok.svg"
              width="24"
              height="24"
              alt=""
              priority
            />
          </div>
        </div>
      </div>
      <div className="copyright-bar">
        <div className="copyright">
          © 2024 Realm Of The Ethernal All Rights Reserved.
        </div>
        <div className="about">
          <ul>
            <li>
              <div className="about-group">
                <Link
                  href="about-us"
                  onClick={(event: any) => {
                    event.preventDefault();
                  }}
                >
                  About
                </Link>
                <div className="marker" />
              </div>
              <div className="about-group">
                <Link
                  href="#"
                  onClick={(event: any) => {
                    event.preventDefault();
                  }}
                >
                  How to play
                </Link>
                <div className="marker" />
              </div>
              <div className="about-group">
                <Link href={`#`}>Privacy Policy</Link>
                <div className="marker" />
              </div>
              <div className="about-group">
                <Link href={`#`}>Terms of Service</Link>
                <div className="marker" />
              </div>
              <div className="about-group">
                <Link
                  href="about-us"
                  onClick={(event: any) => {
                    event.preventDefault();
                  }}
                >
                  Contact Us
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </FooterStyled>
  );
};

export default Footer;
