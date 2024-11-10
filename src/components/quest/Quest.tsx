import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { IRefPhaserGame, PhaserGame } from '@/game/PhaserGame';
import { QuestMap } from '@/game/scenes/QuestMap';

const Quest = () => {
  const phaserRef = useRef<IRefPhaserGame | null>(null);
  const [canMoveSprite, setCanMoveSprite] = useState(true);

  console.log('canMoveSprite', canMoveSprite);

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

  return (
    <QuestContainer>
      <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
    </QuestContainer>
  );
};
export default Quest;

const QuestContainer = styled.div`
  margin-top: -88px;
  height: 100vh;
  canvas {
    height: 100vh;
    max-width: 99.4vw;
  }
`;
