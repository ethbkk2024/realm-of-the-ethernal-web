import React, { ReactElement } from 'react';
import MainLayout from '@/layouts/MainLayout';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import apiBattle from '@/services/battle';

const PvpPage = () => {
  const router = useRouter();
  const startBattle = async (battleLv: number) => {
    await apiBattle
      .startBattle({
        battle_level: battleLv,
        battle_id: 'test106',
      })
      .then((response) => {
        if (response.data) {
          router.push(`/pvp/${battleLv}?id=${response.data.id}`);
        }
      });
  };
  return (
    <SelectContainer>
      <LevelCard onClick={() => startBattle(1)}>
        <img alt="" src={'/assets/character/boss/boss-lv-1.png'} />
        <div className={'title'}>LEVEL 1</div>
        <div className={'name'}>Goblin King</div>
      </LevelCard>
      <LevelCard onClick={() => startBattle(2)}>
        <img alt="" src={'/assets/character/boss/boss-lv-2.png'} />
        <div className={'title'}>LEVEL 2</div>
        <div className={'name'}>Dragon Lord</div>
      </LevelCard>
      <LevelCard onClick={() => startBattle(3)}>
        <img alt="" src={'/assets/character/boss/boss-lv-3.png'} />
        <div className={'title'}>LEVEL 3</div>
        <div className={'name'}>Dark Wizard</div>
      </LevelCard>
    </SelectContainer>
  );
};

PvpPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default PvpPage;

const SelectContainer = styled.div`
  margin-top: -88px;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-image: url('/images/bg-5.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow-x: hidden;
`;

const LevelCard = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.99),
    rgba(98, 98, 98, 0.6)
  );
  position: relative;
  transform: skewX(-12deg);
  display: flex;
  justify-content: end;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  &:hover {
  }

  .title {
    height: 96px;
    font-size: 56px;
    color: white;
  }
  .name {
    height: 275px;
    font-size: 28px;
    color: white;
  }

  img {
    position: absolute;
    top: 150px;
    zoom: 2;
  }
`;
