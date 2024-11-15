import React from 'react';
import styled from 'styled-components';
import { LoadElement } from '@/styles/animations';
import Image from 'next/image';
import BaseButton from '@/components/BaseButton';

const LootBoxSectionStyle = styled.div`
  width: 800px;
  animation: ${LoadElement} 0.3s ease-in;
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  place-items: center;
  margin-top: 24px;
  max-width: 100%;
  .box-card {
    width: 100%;
    position: relative;
    padding: 24px;
    );
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    row-gap: 24px;
    overflow: hidden;
    transition: 0.15s ease-out;
    .bg-card {
      transition: 0.3s ease-out;
      transform: scale(1.2);
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
      .bg-card {
        filter: saturate(2) brightness(1.1) !important;
      }
    }
    .name {
      font-size: 16px;
      font-weight: 600;
      z-index: 1;
      color: white;
    }
    .box-image {
      width: 224px;
      z-index: 1;
    }
  }
`;
const LootBoxSection = () => {
  const handleClick = () => {
    console.log('click buy');
  };
  return (
    <LootBoxSectionStyle>
      <div className="box-card">
        <div className="name">Character Box</div>
        <Image
          src="/images/bg-loot-box-1.webp"
          fill
          alt=""
          className="bg-card"
          draggable={false}
        />
        <Image
          src="/images/loot-box-1.webp"
          width={100}
          height={100}
          alt=""
          className="box-image"
          draggable={false}
        />
        <BaseButton
          text={'Buy'}
          handleClick={() => {
            handleClick();
          }}
        />
      </div>
      <div className="box-card">
        <div className="name">Item Box</div>
        <Image
          src="/images/bg-loot-box-3.webp"
          fill
          alt=""
          className="bg-card"
          draggable={false}
        />
        <Image
          src="/images/loot-box-1.webp"
          width={100}
          height={100}
          alt=""
          className="box-image"
          draggable={false}
        />
        <BaseButton
          text={'Buy'}
          handleClick={() => {
            handleClick();
          }}
        />
      </div>
    </LootBoxSectionStyle>
  );
};

export default LootBoxSection;
