import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { IRefPhaserGame } from '@/game/QuestGame';
import { PvpGame } from '@/game/PvpGame';
import { PvpMap } from '@/game/scenes/PvpMap';

const Pvp = () => {
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const [canMoveSprite, setCanMoveSprite] = useState(true);

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

  return (
    <PvpContainer>
      <PvpGame ref={phaserRef} currentActiveScene={currentScene} />
    </PvpContainer>
  );
};
export default Pvp;

const PvpContainer = styled.div`
  margin-top: -88px;
  height: 100vh;
  canvas {
    height: 100vh;
    max-width: 100vw;
  }
`;
