import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { IRefPhaserGame } from '@/game/QuestGame';
import { PvpGame } from '@/game/PvpGame';
import { PvpMap } from '@/game/scenes/PvpMap';
import { useRouter } from 'next/router';

const Pvp = () => {
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const [canMoveSprite, setCanMoveSprite] = useState(true);
  const router = useRouter();
  const { lv } = router.query;

  console.log('canMoveSprite', canMoveSprite);

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
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as PvpMap;
      if (scene) {
        scene.handleData(mockResponse);
      }
    }
  };

  useEffect(() => {
    if (phaserRef.current && lv && mockResponse) {
      const scene = phaserRef.current.scene as PvpMap;
      if (scene) {
        const init = { initialStat: mockResponse.initialStat, bossLv: lv };
        scene.handleInit(init);
      }
    }
  }, [phaserRef?.current, lv, mockResponse]);

  return (
    <PvpContainer>
      <PvpGame ref={phaserRef} currentActiveScene={currentScene} />
      <button onClick={sendGameData}>test</button>
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
  canvas {
    margin-top: 88px;
    //width: 1024px;
    //height: 768px;
    width: 100%;
    height: 100%;
  }
`;

const mockResponse = {
  action_list: [
    {
      maxHp: 200,
      attacker: 'player',
      damage: 7.5,
      hp: 192.5,
    },
    {
      maxHp: 150,
      attacker: 'boss',
      damage: 19,
      hp: 131,
    },
    {
      maxHp: 200,
      attacker: 'player',
      damage: 7.5,
      hp: 185,
    },
    {
      maxHp: 150,
      attacker: 'boss',
      damage: 19,
      hp: 112,
    },
    {
      maxHp: 200,
      attacker: 'player',
      damage: 7.5,
      hp: 177.5,
    },
    {
      maxHp: 150,
      attacker: 'boss',
      damage: 19,
      hp: 93,
    },
    {
      maxHp: 200,
      attacker: 'player',
      damage: 7.5,
      hp: 170,
    },
    {
      maxHp: 150,
      attacker: 'boss',
      damage: 19,
      hp: 74,
    },
    {
      maxHp: 200,
      attacker: 'player',
      damage: 7.5,
      hp: 162.5,
    },
    {
      maxHp: 150,
      attacker: 'boss',
      damage: 19,
      hp: 55,
    },
    {
      maxHp: 200,
      attacker: 'player',
      damage: 7.5,
      hp: 155,
    },
    {
      maxHp: 150,
      attacker: 'boss',
      damage: 19,
      hp: 36,
    },
    {
      maxHp: 200,
      attacker: 'player',
      damage: 7.5,
      hp: 147.5,
    },
    {
      maxHp: 150,
      attacker: 'boss',
      damage: 19,
      hp: 17,
    },
    {
      maxHp: 200,
      attacker: 'player',
      damage: 7.5,
      hp: 140,
    },
    {
      maxHp: 150,
      attacker: 'boss',
      damage: 19,
      hp: -2,
    },
  ],
  summary: {
    winner: 'boss',
  },
  initialStat: {
    player: {
      max_hp: 150,
      hp: 150,
      atk: 15,
      def: 12,
    },
    boss: {
      max_hp: 200,
      hp: 200,
      atk: 25,
      def: 15,
    },
  },
};
