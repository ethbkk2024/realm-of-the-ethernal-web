import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { IRefPhaserGame, QuestGame } from '@/game/QuestGame';
import { QuestMap } from '@/game/scenes/QuestMap';
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { gameABI } from '@/utils/abi/game';
import { subAddressFormat } from '@/utils/address';
import apiGraphql from '@/services/graphql';
import _ from 'lodash';
import { CompleteModal } from '@/components/quest/CompleteModal';
import useSnackbar from '@/stores/layout/snackbar/useSnackbar';

const Quest = () => {
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const [canMoveSprite, setCanMoveSprite] = useState(true);
  const { address } = useAccount();
  console.log('canMoveSprite', canMoveSprite);
  const { data: hash, writeContract, isPending } = useWriteContract();
  const [completeModal, setCompleteModal] = useState(false);
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

  const currentScene = (scene: Phaser.Scene) => {
    setCanMoveSprite(scene.scene.key !== 'QuestMap');
  };

  useEffect(() => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as QuestMap;
      if (scene) {
        scene.changeScene();
      }
    }
  }, [phaserRef]);

  useEffect(() => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as QuestMap;
      if (scene && myNft) {
        scene.onJoinQuest(() => {
          if (!isPending || !isConfirming) {
            writeContract({
              abi: gameABI,
              address: `0x${subAddressFormat(`${process.env.NEXT_PUBLIC_CONTRACT_GAME}`)}`,
              functionName: 'startQuest',
              args: [BigInt(Number(myNft[0]?.NFT_id))],
            });
          }
        });
      }
    }
  }, [phaserRef?.current, myNft]);

  useEffect(() => {
    if (isConfirmed) {
      setCompleteModal(true);
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
    <QuestContainer>
      {completeModal && (
        <CompleteModal onClose={() => setCompleteModal(false)} />
      )}
      <QuestGame ref={phaserRef} currentActiveScene={currentScene} />
    </QuestContainer>
  );
};
export default Quest;

const QuestContainer = styled.div`
  margin-top: -88px;
  height: 100vh;
  canvas {
    width: 100%;
    height: 100%;
  }
`;
