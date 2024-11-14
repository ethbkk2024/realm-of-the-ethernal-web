import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ActionButton from '@/components/ActionButton';
import styled from 'styled-components';
import Image from 'next/image';
import BrandMarquee from '@/components/landing/BrandMarquee';
import Plyr from 'plyr-react';
import { LoadElement } from '@/styles/animations';

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
        font-size: 32px;
        text-align: center;
        line-height: 1.4;
        z-index: 1;
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

      .h1 {
        font-size: 20px;
        text-align: center;
        line-height: 1.4;
        @media screen and (max-width: 980px) {
          font-size: 18px;
        }
        @media screen and (max-width: 768px) {
          font-size: 14px;
        }
      }

      p {
        font-size: 14px;
        text-align: center;
        z-index: 1;
        max-width: 980px;
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
      //
    }
    @media screen and (max-width: 620px) {
      button {
        height: 48px !important;
        .drop {
          width: 34px;
          height: 34px;
        }
      }
    }

    .player-wrap {
      min-width: 800px;
      min-height: 450px;
      width: 800px;
      background: #ffffff80;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 40px;
      max-width: 100%;
      z-index: 1;
      overflow: hidden;
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
      @media screen and (max-width: 980px) {
        margin-bottom: 26px;
      }
      .video {
        animation: ${LoadElement} 0.3s ease-in;
      }
    }
  }
`;
const BrandMarqueeWrapStyled = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #263238;
  * {
    color: white;
  }
  .text-group {
    display: flex;
    flex-direction: column;
    padding: 0 24px;
    align-items: center;
    h2 {
      font-size: 32px;
      margin-top: 40px;
      text-align: center;
      @media screen and (max-width: 980px) {
        font-size: 30px;
      }
      @media screen and (max-width: 768px) {
        font-size: 24px;
      }
      @media screen and (max-width: 620px) {
        font-size: 18px;
        padding: 0 24px;
      }
    }
    .h2 {
      font-size: 20px;
      text-align: center;
      @media screen and (max-width: 980px) {
        font-size: 18px;
      }
      @media screen and (max-width: 768px) {
        font-size: 16px;
      }
      @media screen and (max-width: 620px) {
        font-size: 14px;
      }
    }
    p {
      text-align: center;
      font-weight: 400;
      max-width: 768px;
    }
  }
`;
type VideoPlayerProps = {
  videoUrl: string;
};

const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => (
  <Plyr
    source={{
      type: 'video',
      sources: [
        {
          src: videoUrl,
          type: 'video/mp4',
        },
      ],
    }}
    options={{
      controls: [
        'play',
        'progress',
        'current-time',
        'mute',
        'volume',
        'fullscreen',
      ],
    }}
  />
);
const FirstSection = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  useEffect(() => {
    const video = document.createElement('video');
    video.src = 'https://assets.sheetpapers.com/videos%2Fman-on-the-cloud.mp4';
    video.onloadeddata = () => setIsVideoLoaded(true);
  }, []);
  return (
    <>
      <FirstSectionStyled id="/">
        <Image
          src="/images/bg-4.png"
          fill
          alt=""
          priority
          className="bg-image"
          draggable={false}
        />
        <header className="header-landing">
          <div className="header-content-wrap">
            <h1>Realm Of The Eternal Archive</h1>
            <p className="h1">Explore a Mystical World of Endless Knowledge</p>
            <p>
              Venture into an ancient archive filled with hidden artifacts,
              mystical spells, and secrets from a forgotten era. Unlock
              treasures and face thrilling quests as you journey deeper into the
              unknown.
            </p>
          </div>
        </header>
        <section className="first-section-content">
          <div className="player-wrap">
            {isVideoLoaded ? (
              <div className="video">
                <VideoPlayer
                  videoUrl={
                    'https://assets.sheetpapers.com/videos%2Fman-on-the-cloud.mp4'
                  }
                />
              </div>
            ) : (
              <p>Loading video...</p>
            )}
          </div>
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
        </section>
      </FirstSectionStyled>
      <BrandMarqueeWrapStyled>
        <div className="text-group">
          <h2>The Secrets of the Eternal Archive</h2>
          <p className="h2 mt-[16px]">Join a world where knowledge is power.</p>
          <p>
            Dive into quests that challenge your wits and courage. Unravel
            mysteries, collect rare artifacts, and become part of a story that
            blends ancient wisdom with modern technology.
          </p>
        </div>
        <BrandMarquee />
      </BrandMarqueeWrapStyled>
    </>
  );
};
export default FirstSection;
