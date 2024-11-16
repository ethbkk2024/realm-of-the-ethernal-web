import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { LoadElement } from '@/styles/animations';
import Image from 'next/image';
import BaseButton from '@/components/BaseButton';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { nftABI } from '@/utils/abi/nft';
import { subAddressFormat } from '@/utils/address';
import useSnackbar from '@/stores/layout/snackbar/useSnackbar';
import { extractErrorReason } from '@/utils/errorContract';

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
      &:nth-child(1) {
          .box-image {
              transform: scale(1.5);
          }
      } 
  }
`;
const LootBoxSection = () => {
  const {
    data: hash,
    writeContract,
    isPending,
    isError,
    error,
  } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError: isErrorTransaction,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(!!(isPending || isConfirming));
  }, [isConfirming, isPending, isConfirmed, isError]);

  useEffect(() => {
    if (isConfirmed) {
      useSnackbar.getState().openSnackbar({
        open: true,
        text: 'Transaction success.',
        severity: 'success',
      });
    } else if (isError) {
      const errorReason = extractErrorReason(error);
      useSnackbar.getState().openSnackbar({
        open: true,
        text: errorReason,
        severity: 'error',
      });
    }
  }, [isConfirmed, isError, isErrorTransaction]);

  const handleOpenCharacterBox = () => {
    if (!isPending && !isConfirming) {
      writeContract({
        abi: nftABI,
        address: `0x${subAddressFormat(`${process.env.NEXT_PUBLIC_CONTRACT_NFT}`)}`,
        functionName: 'openCharacterLootBox',
        args: [],
      });
    }
  };

  const handleOpenItemBox = () => {
    if (!isPending && !isConfirming) {
      writeContract({
        abi: nftABI,
        address: `0x${subAddressFormat(`${process.env.NEXT_PUBLIC_CONTRACT_NFT}`)}`,
        functionName: 'openItemLootBox',
        args: [],
      });
    }
  };

  return (
    <LootBoxSectionStyle>
      {/* Character Box */}
      <div className="box-card">
        <div className="name">Character Box</div>
        <Image
          src="/images/bg-loot-box-1.webp"
          fill
          alt="Character Loot Box"
          className="bg-card"
          draggable={false}
        />
        <Image
          src="/images/c-box.png"
          width={100}
          height={100}
          alt="Character Box"
          className="box-image"
          draggable={false}
        />
        <BaseButton
          text={`${loading ? 'Opening...' : 'Open (5 Realm)'}`}
          handleClick={() => {
            if (!loading) {
              handleOpenCharacterBox();
            }
          }}
        />
      </div>

      {/* Item Box */}
      <div className="box-card">
        <div className="name">Item Box</div>
        <Image
          src="/images/bg-loot-box-3.webp"
          fill
          alt="Item Loot Box"
          className="bg-card"
          draggable={false}
        />
        <Image
          src="/images/w-box.png"
          width={100}
          height={100}
          alt="Item Box"
          className="box-image"
          draggable={false}
        />
        <BaseButton
          text={`${loading ? 'Opening...' : 'Open (5 Realm)'}`}
          handleClick={() => {
            if (!loading) {
              handleOpenItemBox();
            }
          }}
        />
      </div>
    </LootBoxSectionStyle>
  );
};
export default LootBoxSection;
