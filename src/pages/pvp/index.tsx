import React, { ReactElement } from 'react';
import MainLayout from '@/layouts/MainLayout';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const PvpPage = () => {
  const router = useRouter();
  return (
    <SelectContainer>
      <LevelCard onClick={() => router.push(`/pvp/${1}`)}>
        <div className={'title'}>LEVEL 1</div>
      </LevelCard>
      <LevelCard onClick={() => router.push(`/pvp/${2}`)}>
        <div className={'title'}>LEVEL 2</div>
      </LevelCard>
      <LevelCard onClick={() => router.push(`/pvp/${3}`)}>
        <div className={'title'}>LEVEL 3</div>
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
`;

const LevelCard = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.99),
    rgba(98, 98, 98, 0.6)
  );
  position: relative;
  transform: skewX(-12deg);
  display: flex;
  justify-content: center;
  align-items: end;
  cursor: pointer;
  &:hover {
  }

  .title {
    height: 275px;
    font-size: 56px;
    color: white;
  }
`;
