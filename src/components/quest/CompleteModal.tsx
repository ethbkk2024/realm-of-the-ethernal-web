import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import apiGraphql from '@/services/graphql';
import _ from 'lodash';
import { gameABI } from '@/utils/abi/game';
import { subAddressFormat } from '@/utils/address';
import useSnackbar from '@/stores/layout/snackbar/useSnackbar';

export function CompleteModal({ onClose }: { onClose: () => void }) {
  const { address } = useAccount();
  const { data: hash, writeContract, isPending } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const [myNft, setMyNft] = useState<any[]>([]);

  useEffect(() => {
    fetchMyNft();
  }, [address]);

  useEffect(() => {}, []);

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

  const onComplete = () => {
    if ((!isPending || !isConfirming) && myNft && myNft[0]?.NFT_id) {
      writeContract({
        abi: gameABI,
        address: `0x${subAddressFormat(`${process.env.NEXT_PUBLIC_CONTRACT_GAME}`)}`,
        functionName: 'completeQuest',
        args: [BigInt(Number(myNft[0]?.NFT_id))],
      });
    }
  };

  useEffect(() => {
    if (isConfirmed) {
      onClose();
      useSnackbar.getState().openSnackbar({
        open: true,
        text: 'Transaction success.',
        severity: 'success',
      });
    }
    if (isError) {
      useSnackbar.getState().openSnackbar({
        open: true,
        text: 'Transaction failed.',
        severity: 'error',
      });
    }
  }, [isConfirmed, isError]);

  return (
    <CompleteContainer>
      <div className={'title'}>Confirm quest</div>
      <div className={'btn'} onClick={onComplete}>
        {isPending || isConfirming ? 'Loading' : 'Confirm'}
      </div>
    </CompleteContainer>
  );
}

const CompleteContainer = styled.div`
  position: absolute;
  z-index: 99;
  width: 600px;
  height: 400px;
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  top: calc(50vh - 200px);
  left: calc(50vw - 300px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 24px;

  .title {
    font-size: 24px;
  }

  .btn {
    padding: 8px;
    background: #f88b2d;
    color: #ffffff;
    border-radius: 8px;
    width: fit-content;
  }
`;
