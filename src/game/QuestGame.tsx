import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import { EventBus } from '@/game/EventBus';
import { AUTO, Game } from 'phaser';
import { Boot } from '@/game/scenes/Boot';
import { Preloader } from '@/game/scenes/Preloader';
import { QuestMap } from '@/game/scenes/QuestMap';

export interface IRefPhaserGame {
  game: Phaser.Game | null;
  scene: Phaser.Scene | null;
}

interface IProps {
  currentActiveScene?: (scene_instance: Phaser.Scene) => void;
}

const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: '100%',
  height: '100%',
  parent: 'quest-container',
  backgroundColor: '#000000',
  scene: [Boot, Preloader, QuestMap],
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export const QuestGame = forwardRef<IRefPhaserGame, IProps>(function QuestGame(
  { currentActiveScene },
  ref,
) {
  const game = useRef<Phaser.Game | null>(null!);
  useLayoutEffect(() => {
    if (game.current === null) {
      game.current = StartGame('quest-container');
      if (typeof ref === 'function') {
        ref({ game: game.current, scene: null });
      } else if (ref) {
        ref.current = { game: game.current, scene: null };
      }
    }
    return () => {
      if (game.current) {
        game.current.destroy(true);
        if (game.current !== null) {
          game.current = null;
        }
      }
    };
  }, [ref]);

  useEffect(() => {
    EventBus.on('current-scene-ready', (scene_instance: Phaser.Scene) => {
      if (currentActiveScene && typeof currentActiveScene === 'function') {
        currentActiveScene(scene_instance);
      }

      if (typeof ref === 'function') {
        ref({ game: game.current, scene: scene_instance });
      } else if (ref) {
        ref.current = { game: game.current, scene: scene_instance };
      }
    });
    return () => {
      EventBus.removeListener('current-scene-ready');
    };
  }, [currentActiveScene, ref]);

  return <div id="quest-container"></div>;
});
