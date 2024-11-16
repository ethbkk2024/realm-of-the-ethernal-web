import React, { ReactElement, useEffect, useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import apiIPFS from '@/services/ipfs';
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import apiGraphql from '@/services/graphql';
import _ from 'lodash';
import { gameABI } from '@/utils/abi/game';
import { subAddressFormat } from '@/utils/address';
import { readContract } from '@wagmi/core';
import { config } from '@/utils/config';
import apiBattle from '@/services/battle';

const PvpPage = () => {
  const router = useRouter();
  const { address } = useAccount();
  const { data: hash, writeContract, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  const [nftMetadata, setNftMetadata] = useState<any>();
  const [playerIndex, setPlayerIndex] = useState<any>(null);
  const [myNft, setMyNft] = useState<any[]>([]);
  const [lvSelected, setLvSelected] = useState<number>(0);

  useEffect(() => {
    fetchMyNft();
  }, [address]);

  const fetchMyNft = async () => {
    if (address) {
      await apiGraphql.getNFTsByOwner(address).then((response) => {
        const nfts = _.filter(response.data.transferSingles, (o: any) => {
          return o.NFT_id === '10001' || o.NFT_id === '10002';
        });
        setMyNft(nfts);
      });
    }
  };

  useEffect(() => {
    fetchMetadata();
  }, [myNft]);

  const fetchMetadata = async () => {
    setNftMetadata([]);
    if (myNft.length > 0) {
      setPlayerIndex(0);
      myNft.map(async (data) => {
        await apiIPFS.getMetadata(data.NFT_id).then((response) => {
          if (response) {
            setNftMetadata((prev: any) => [
              ...prev,
              { nftId: data.NFT_id, data: response },
            ]);
          }
        });
      });
    }
  };

  const startBattle = async (battleLv: number) => {
    if (nftMetadata && (!isPending || !isConfirming)) {
      setLvSelected(battleLv);
      writeContract({
        abi: gameABI,
        address: `0x${subAddressFormat(`${process.env.NEXT_PUBLIC_CONTRACT_GAME}`)}`,
        functionName: 'startBattle',
        args: [BigInt(Number(nftMetadata[0].nftId)), BigInt(battleLv)],
      });
    }
  };

  useEffect(() => {
    handleBattle();
  }, [isConfirmed]);

  const handleBattle = async () => {
    const id = await readContract(config, {
      abi: gameABI,
      address: `0x${subAddressFormat(`${process.env.NEXT_PUBLIC_CONTRACT_GAME}`)}`,
      functionName: 'battleCount',
    });
    if (id && lvSelected) {
      await apiBattle
        .startBattle({
          battle_level: lvSelected,
          battle_id: String(Number(id)),
          player: {
            nft_id: nftMetadata[playerIndex].nftId,
            hp: Number(nftMetadata[playerIndex].data.attributes[2].value),
            atk: Number(nftMetadata[playerIndex].data.attributes[3].value),
            def: Number(nftMetadata[playerIndex].data.attributes[4].value),
          },
        })
        .then((response) => {
          if (response.data) {
            router.push(`/pvp/${lvSelected}?id=${response.data.id}`);
          }
        });
    }
  };

  return (
    <SelectContainer>
      <PlayerCard onClick={() => null}>
        {nftMetadata ? (
          <>
            {/* <div className={'flex items-center gap-2 justify-center'}> */}
            {/*  <div */}
            {/*    className={`btn prev ${playerIndex === 0 && 'disable'}`} */}
            {/*    onClick={() => { */}
            {/*      if (playerIndex > 0) { */}
            {/*        setPlayerIndex(playerIndex - 1); */}
            {/*      } */}
            {/*    }} */}
            {/*  > */}
            {/*    Prev */}
            {/*  </div> */}
            {/*  <div */}
            {/*    className={`btn next ${playerIndex === nftMetadata.length - 1 && 'disable'}`} */}
            {/*    onClick={() => { */}
            {/*      if (playerIndex < nftMetadata.length - 1) { */}
            {/*        setPlayerIndex(playerIndex + 1); */}
            {/*      } */}
            {/*    }} */}
            {/*  > */}
            {/*    Next */}
            {/*  </div> */}
            {/* </div> */}
            <img alt="" src={nftMetadata[playerIndex]?.data?.image} />
            <div className={'title'}>MY HERO</div>
            <div className={'name'}>{nftMetadata[playerIndex]?.data?.name}</div>
          </>
        ) : (
          <div
            className={'btn open'}
            onClick={() => router.push('/marketplace')}
          >
            Open box
          </div>
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
    height: 64px;
    font-size: 32px;
    color: white;
  }
  .name {
    height: 150px;
    font-size: 18px;
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
    max-height: 40px;
    cursor: pointer;
    z-index: 2;
  }

  .open {
    position: absolute;
    top: 50vh;
    font-size: 24px;
    height: 48px;
  }

  .btn.disable {
    background: gray;
  }

  .prev {
    font-size: 24px;
    color: white;
    scale: 0.8;
  }

  .next {
    font-size: 24px;
    color: white;
    scale: 0.8;
  }

  img {
    position: absolute;
    top: 50px;
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
    height: 64px;
    font-size: 32px;
    color: white;
  }
  .name {
    height: 220px;
    font-size: 18px;
    color: white;
  }

  img {
    transform: skewX(12deg);
    position: absolute;
    top: 150px;
    zoom: 2;
  }
`;
