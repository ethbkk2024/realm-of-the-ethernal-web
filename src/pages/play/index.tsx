import React, { ReactElement } from 'react';
import styled from 'styled-components';
import MainLayout from '@/layouts/MainLayout';
import BaseButton from '@/components/BaseButton';
import { useRouter } from 'next/router';

const PlayPageStyle = styled.div`
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100dvh - 656px);
  .info {
    width: 800px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    margin-bottom: 24px;
    div {
      text-align: center;
      line-height: 1.8;
      color: white;
      &:first-child {
        font-size: 20px;
      }
    }
  }
  .content-card {
    width: 800px;
    max-width: 100%;
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(auto-fill, minmax(356px, 1fr));

    .card-play {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-items: center;
      transition: 0.15s ease-out;
      color: white;
      padding: 24px;
      position: relative;
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

      .title-play {
        font-size: 22px;
        font-weight: 600;
        text-align: center;
      }

      .description-play {
        line-height: 1.8;
        text-align: center;
      }
      &:hover {
        .card-play-backdrop {
          opacity: 1;
          visibility: visible;
        }
      }
      .card-play-backdrop {
        width: 100%;
        height: 100%;
        position: absolute;
        background: rgba(0, 0, 0, 0.24);
        backdrop-filter: blur(5px);
        opacity: 0;
        visibility: hidden;
        transition: 0.15s ease-out;
        margin-top: -24px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        button {
          background: #fd5394;
        }
      }
    }
  }
`;
const PlayPage = () => {
  const router = useRouter();
  return (
    <PlayPageStyle>
      <div className="info">
        <div>Welcome to the adventure hub!</div>
        <div>
          Choose between completing quests to earn exciting rewards or battling
          formidable bosses to claim glory and treasure. Each path leads to
          unique challenges and opportunities, so pick your journey and dive
          into the mystical world!
        </div>
      </div>

      <div className="content-card">
        <div className="card-play">
          <div className="card-play-backdrop">
            <BaseButton
              text={'Play'}
              handleClick={async () => {
                await router.push('/quest');
              }}
            />
          </div>
          <div className="title-play">Quest</div>
          <div className="description-play">
            Complete challenging quests to earn rewards and progress through the
            mystical world.
          </div>
        </div>
        <div className="card-play">
          <div className="card-play-backdrop">
            <BaseButton
              text={'Play'}
              handleClick={async () => {
                await router.push('/pvp');
              }}
            />
          </div>
          <div className="title-play">Boss</div>
          <div className="description-play">
            Battle powerful bosses to claim epic rewards and showcase your
            strength.
          </div>
        </div>
      </div>
    </PlayPageStyle>
  );
};
PlayPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default PlayPage;
