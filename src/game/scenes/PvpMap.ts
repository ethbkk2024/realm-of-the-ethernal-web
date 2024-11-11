import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class PvpMap extends Scene {
  background: GameObjects.Image | undefined;

  camera: Phaser.Cameras.Scene2D.Camera | undefined;

  logo: GameObjects.Image | undefined;

  title: GameObjects.Text | undefined;

  logoTween: Phaser.Tweens.Tween | null | undefined;

  constructor() {
    super('PvpMap');
  }

  preload() {
    this.load.setPath('assets');
    this.load.image({
      key: 'land-a',
      url: 'land/land-a.png',
    });
    this.load.image({
      key: 'dark-forest-0',
      url: 'background/dark-forest/Layer_0011_0.png',
    });
  }

  create() {
    this.camera = this.cameras.main;
    // this.cameras.main.setBounds(0, 0, 100, 100);
    this.camera.setBackgroundColor(0x000);
    const screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
    this.background = this.add
      .image(screenCenterX, screenCenterY, 'dark-forest-0')
      .setOrigin(0.5, 0.5);
    this.background = this.add.image(0, 0, 'dark-forest-0').setOrigin(0, 0);
    this.add
      .sprite(screenCenterX - 250, screenCenterY - 120, 'land-a')
      .setScale(0.75)
      .setOrigin(0.5, 0.5);
    EventBus.emit('current-scene-ready', this);
  }

  changeScene() {
    if (this.logoTween) {
      this.logoTween.stop();
      this.logoTween = null;
    }
    this.scene.start('QuestMap');
  }
}
