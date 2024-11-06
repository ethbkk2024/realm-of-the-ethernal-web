import React from 'react';
import Link from 'next/link';
import HyActionButton from '@/components/HyActionButton';
import styled from 'styled-components';
import Image from 'next/image';
import BrandMarquee from '@/components/landing/BrandMarquee';

const FirstSectionStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: -88px;
  max-width: 100%;
  flex-direction: column;
  padding: 134px 40px 40px;
  position: relative;
  @media screen and (max-width: 980px) {
    padding: 124px 40px 26px;
  }
  @media screen and (max-width: 620px) {
    padding: 118px 24px 26px;
  }
  .bg-image {
    z-index: 0;
    filter: brightness(0.7);
    object-fit: cover;
  }
  .header-landing {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    .header-content-wrap {
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 1200px;
      max-width: 100%;
      row-gap: 8px;

      h1 {
        font-size: 52px;
        text-align: center;
        line-height: 1.4;
        @media screen and (max-width: 980px) {
          font-size: 44px;
        }
        @media screen and (max-width: 768px) {
          font-size: 40px;
        }
        @media screen and (max-width: 620px) {
          font-size: 34px;
        }
      }

      .h1 {
        font-size: 40px;
        text-align: center;
        line-height: 1.4;
        @media screen and (max-width: 980px) {
          font-size: 34px;
        }
        @media screen and (max-width: 768px) {
          font-size: 30px;
        }
        @media screen and (max-width: 620px) {
          font-size: 28px;
        }
      }

      p {
        font-size: 24px;
        text-align: center;
        z-index: 1;
        max-width: 980px;
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
  }

  .first-section-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
    @media screen and (max-width: 980px) {
      margin-top: 26px;
    }
    @media screen and (max-width: 768px) {
      button {
        width: 274px;
        font-size: 18px !important;
      }
    }
    @media screen and (max-width: 620px) {
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

    .image-wrap {
      width: 1200px;
      box-shadow: 0px 0px 16px 0px #00000014;
      border-radius: 40px;
      border: 2px solid #ffffff33;
      background: #ffffff80;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 40px;
      max-width: 100%;
      z-index: 1;
      @media screen and (max-width: 980px) {
        margin-bottom: 26px;
      }

      img {
        width: 100%;
        height: 100%;
        padding: 8px;
        border-radius: 40px;
        aspect-ratio: 20/9 !important;

        @media screen and (max-width: 980px) {
          padding: 4px;
        }
      }
    }
  }
`;
const BrandMarqueeWrapStyled = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .text-group {
    display: flex;
    flex-direction: column;
    padding: 0 24px;
    h2 {
      font-size: 42px;
      margin-top: 40px;
      text-align: center;
      @media screen and (max-width: 980px) {
        font-size: 38px;
      }
      @media screen and (max-width: 768px) {
        font-size: 34px;
      }
      @media screen and (max-width: 620px) {
        font-size: 30px;
        padding: 0 24px;
      }
    }
    .h2 {
      font-size: 38px;
      text-align: center;
      @media screen and (max-width: 980px) {
        font-size: 32px;
      }
      @media screen and (max-width: 768px) {
        font-size: 28px;
      }
      @media screen and (max-width: 620px) {
        font-size: 24px;
      }
    }
    p {
      text-align: center;
      font-weight: 400;
      max-width: 768px;
    }
  }
`;
const FirstSection = () => {
  return (
    <>
      <FirstSectionStyled id="/">
        <Image
          src="/images/bg-4.png"
          fill
          alt=""
          priority
          className="bg-image"
        />
        <header className="header-landing">
          <div className="header-content-wrap">
            <h1>Realm Of The Ethernal</h1>
            <p className="h1">Commodo duis est enim id.</p>
            <p>
              Magna nulla amet eiusmod nisi anim fugiat veniam cillum ad dolor
              irure. Consequat non quis eiusmod laborum deserunt aute do
              adipiscing id.
            </p>
          </div>
        </header>
        <section className="first-section-content">
          <div className="image-wrap">
            <Image
              src="/images/landing/landing-mock.png"
              width={1600}
              height={1200}
              alt=""
              priority
            />
          </div>
          <Link href={`#`}>
            <HyActionButton
              text="Start the game"
              boxShadow="0px 0px 0px 2px white inset !important"
              height={56}
              fontSize={20}
              dropRight={8}
              dropColor={'gradient'}
              width={272}
            />
          </Link>
        </section>
      </FirstSectionStyled>
      <BrandMarqueeWrapStyled>
        <div className="text-group">
          <h2>Realm Of The Ethernal</h2>
          <p className="h2">Commodo duis est enim id.</p>
          <p>
            Magna nulla amet eiusmod nisi anim fugiat veniam cillum ad dolor
            irure. Consequat non quis eiusmod laborum deserunt aute do
            adipiscing id.
          </p>
        </div>
        <BrandMarquee />
      </BrandMarqueeWrapStyled>
    </>
  );
};

export default FirstSection;
