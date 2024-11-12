import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import ActionButton from '@/components/ActionButton';

const FooterStyled = styled.footer`
  width: 100%;
  background: linear-gradient(
    45deg,
    rgba(59, 0, 102, 1) 20%,
    rgba(0, 56, 94, 1) 100%
  );
  filter: saturate(0.4);
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
    padding: 40px 20px 40px 20px;
    row-gap: 36px;
    z-index: 1;
    @media screen and (max-width: 620px) {
      padding: 40px 24px 24px;
      button {
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
      font-size: 32px;
      color: white;
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
    .footer-description {
      color: white;
      font-size: 16px;
      text-align: center;
      @media screen and (max-width: 768px) {
        font-size: 12px;
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
    * {
      font-size: 10px;
    }
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
        font-size: 10px;
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
                font-size: 10px;
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
        <Image
          src="/images/footer-pattern-top.svg"
          fill
          alt="Pattern Top"
          priority
        />
        <Image
          src="/images/footer-pattern-bottom.svg"
          fill
          alt="Pattern Bottom"
          priority
        />
      </div>
      <div className="content-footer">
        <div className="footer-logo">
          <Image
            src="/icons/icon-hy-seller.svg"
            width="82"
            height="94"
            alt="Game Logo"
            priority
          />
        </div>
        <div className="footer-title">Realm of the Eternal Archive</div>
        <Link href={`#`}>
          <ActionButton
            text="Start the Adventure"
            boxShadow="0px 0px 0px 2px white inset !important"
            height={56}
            fontSize={12}
            dropRight={8}
            dropColor={'gradient'}
            width={324}
          />
        </Link>
        <div className="footer-description">
          Embark on an epic journey through the mystical world of the Eternal
          Archive.
        </div>
        <div className="social-media-wrap">
          {/* Facebook */}
          <div className="circle">
            <Image
              src="/icons/icon-facebook.svg"
              width="24"
              height="24"
              alt="Facebook"
              priority
            />
          </div>
          {/* YouTube */}
          <div className="circle">
            <Image
              src="/icons/icon-youtube.svg"
              width="24"
              height="24"
              alt="YouTube"
              priority
            />
          </div>
          {/* Line */}
          <div className="circle">
            <Image
              src="/icons/icon-line.svg"
              width="24"
              height="24"
              alt="Line"
              priority
            />
          </div>
          {/* TikTok */}
          <div className="circle">
            <Image
              src="/icons/icon-tiktok.svg"
              width="24"
              height="24"
              alt="TikTok"
              priority
            />
          </div>
        </div>
      </div>
      <div className="copyright-bar">
        <div className="copyright">
          © 2024 Realm of the Eternal Archive. All Rights Reserved.
        </div>
        <div className="about">
          <ul>
            <li>
              <div className="about-group">
                <Link href="#about-us">About</Link>
                <div className="marker" />
              </div>
              <div className="about-group">
                <Link href="#how-to-play">How to Play</Link>
                <div className="marker" />
              </div>
              <div className="about-group">
                <Link href="#privacy-policy">Privacy Policy</Link>
                <div className="marker" />
              </div>
              <div className="about-group">
                <Link href="#terms-of-service">Terms of Service</Link>
                <div className="marker" />
              </div>
              <div className="about-group">
                <Link href="#contact-us">Contact Us</Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </FooterStyled>
  );
};

export default Footer;
