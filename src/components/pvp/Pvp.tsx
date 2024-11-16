import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { IRefPhaserGame } from '@/game/QuestGame';
import { PvpGame } from '@/game/PvpGame';
import { PvpMap } from '@/game/scenes/PvpMap';
import { useRouter } from 'next/router';
import apiBattle from '@/services/battle';

const Pvp = () => {
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const [canMoveSprite, setCanMoveSprite] = useState(true);
  const router = useRouter();
  const { lv, id } = router.query;
  const [actionData, setActionData] = useState<any>();

  console.log('canMoveSprite', canMoveSprite);

  useEffect(() => {
    getActionList();
  }, [id]);

  const getActionList = async () => {
    if (id) {
      await apiBattle.getActionList(id).then((response) => {
        console.log('response', response);
        if (response?.data) {
          setActionData(response.data);
        }
      });
    }
  };

  const currentScene = (scene: Phaser.Scene) => {
    setCanMoveSprite(scene.scene.key !== 'PvpMap');
  };

  useEffect(() => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as PvpMap;
      if (scene) {
        scene.changeScene();
      }
    }
  }, [phaserRef]);

  const sendGameData = () => {
    if (phaserRef.current && actionData) {
      const scene = phaserRef.current.scene as PvpMap;
      if (scene) {
        scene.handleData(actionData);
      }
    }
  };

  useEffect(() => {
    if (phaserRef.current && lv && actionData) {
      const scene = phaserRef.current.scene as PvpMap;
      if (scene) {
        const init = { initialStat: actionData.initialStat, bossLv: lv };
        scene.handleInit(init);
        scene.playerInit(actionData.initialStat.player.nft_id);
        setTimeout(() => sendGameData(), 2000);
      }
    }
  }, [phaserRef?.current, lv, actionData]);

  useEffect(() => {
    if (actionData) {
      setTimeout(
        () => setIsClose(true),
        (actionData.action_list.length + 2) * 1000,
      );
    }
  }, [actionData]);

  const [isClose, setIsClose] = useState<boolean>(false);

  return (
    <PvpContainer>
      <PvpGame ref={phaserRef} currentActiveScene={currentScene} />
      {isClose && (
        <div
          className={'close'}
          onClick={() => {
            router.push('/pvp');
          }}
        >
          Close
        </div>
      )}
    </PvpContainer>
  );
};
export default Pvp;

const PvpContainer = styled.div`
  margin-top: -88px;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  position: relative;

  canvas {
    margin-top: 88px;
    //width: 1024px;
    //height: 768px;
    width: 100%;
    height: 100%;
  }

  .close {
    font-size: 28px;
    background: #ff7400;
    color: white;
    border-radius: 8px;
    padding: 8px;
    cursor: pointer;
    position: absolute;
    bottom: 40vh;
  }
`;
