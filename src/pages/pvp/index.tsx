import React, { ReactElement, useEffect, useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import apiBattle from '@/services/battle';
import apiIPFS from '@/services/ipfs';

const PvpPage = () => {
  const router = useRouter();

  const nftIds = [10001, 10002];
  const [nftMetadata, setNftMetadata] = useState<any>();
  const [playerIndex, setPlayerIndex] = useState<any>(null);

  useEffect(() => {
    fetchMetadata();
  }, []);

  const fetchMetadata = async () => {
    setNftMetadata([]);
    if (nftIds.length > 0) {
      setPlayerIndex(0);
      nftIds.map(async (id) => {
        await apiIPFS.getMetadata(id).then((response) => {
          if (response) {
            setNftMetadata((prev: any) => [
              ...prev,
              { nftId: id, data: response },
            ]);
          }
        });
      });
    }
  };
  const startBattle = async (battleLv: number) => {
    if (nftMetadata) {
      await apiBattle
        .startBattle({
          battle_level: battleLv,
          battle_id: 'test107',
          player: {
            nft_id: nftMetadata[playerIndex].nftId,
            hp: Number(nftMetadata[playerIndex].data.attributes[2].value),
            atk: Number(nftMetadata[playerIndex].data.attributes[3].value),
            def: Number(nftMetadata[playerIndex].data.attributes[4].value),
          },
        })
        .then((response) => {
          if (response.data) {
            router.push(`/pvp/${battleLv}?id=${response.data.id}`);
          }
        });
    }
  };

  return (
    <SelectContainer>
      <PlayerCard onClick={() => null}>
        {nftMetadata && (
          <>
            <div className={'flex items-center gap-2 justify-center'}>
              <div
                className={`btn prev ${playerIndex === 0 && 'disable'}`}
                onClick={() => {
                  if (playerIndex > 0) {
                    setPlayerIndex(playerIndex - 1);
                  }
                }}
              >
                Prev
              </div>
              <div
                className={`btn next ${playerIndex === nftMetadata.length - 1 && 'disable'}`}
                onClick={() => {
                  if (playerIndex < nftMetadata.length - 1) {
                    setPlayerIndex(playerIndex + 1);
                  }
                }}
              >
                Next
              </div>
            </div>
            <img alt="" src={nftMetadata[playerIndex].data?.image} />
            <div className={'title'}>MY HERO</div>
            <div className={'name'}>{nftMetadata[playerIndex].data?.name}</div>
          </>
        )}
      </PlayerCard>
      <div />
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
  grid-template-columns: 1.75fr 0.1fr 1fr 1fr 1fr;
  background-image: url('/images/bg-5.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow-x: hidden;
`;

const PlayerCard = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.99),
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

  .btn {
    background: #ff8e28;
    color: white;
    padding: 16px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 80px;
    cursor: pointer;
    z-index: 2;
  }

  .btn.disable {
    background: gray;
  }

  .prev {
    height: 275px;
    font-size: 28px;
    color: white;
    scale: 0.8;
  }

  .next {
    height: 275px;
    font-size: 28px;
    color: white;
    scale: 0.8;
  }

  img {
    position: absolute;
    top: 100px;
    zoom: 2;
    transform: skewX(12deg);
  }
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
    transform: skewX(12deg);
    position: absolute;
    top: 200px;
    zoom: 2;
  }
`;

const mockPlayerMeta = {
  name: 'Warrior',
  description: 'A mighty warrior skilled in close combat and defensive tactics',
  image:
    'https://gateway.lighthouse.storage/ipfs/bafybeigkyttg6h63viklsstmxmuzrg6vcqgihotspmvvm3nrm6zimtyty4/10001.png',
  attributes: [
    {
      trait_type: 'Character Type',
      value: 'Warrior',
    },
    {
      trait_type: 'Base Level',
      value: 1,
    },
    {
      trait_type: 'Health',
      value: 150,
    },
    {
      trait_type: 'Attack',
      // value: 15,
      value: 30,
    },
    {
      trait_type: 'Defense',
      value: 12,
    },
    {
      trait_type: 'Power',
      value: 100,
    },
    {
      trait_type: 'Class Ability',
      value: 'Shield Block',
    },
    {
      trait_type: 'Weapon Proficiency',
      value: 'Swords and Axes',
    },
    {
      trait_type: 'Armor Proficiency',
      value: 'Heavy Armor',
    },
  ],
  background_color: '8B0000',
};
