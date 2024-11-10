import { Boot } from './scenes/Boot';
import { QuestMap } from './scenes/QuestMap';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';

export const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: '100%',
  height: '100%',
  parent: 'game-container',
  backgroundColor: '#000000',
  scene: [Boot, Preloader, QuestMap],
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
