import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class PvpMap extends Scene {
  background: GameObjects.Image | undefined;

  private bg0!: Phaser.GameObjects.TileSprite;

  private bg1!: Phaser.GameObjects.TileSprite;

  private bg2!: Phaser.GameObjects.TileSprite;

  camera: Phaser.Cameras.Scene2D.Camera | undefined;

  logo: GameObjects.Image | undefined;

  title: GameObjects.Text | undefined;

  logoTween: Phaser.Tweens.Tween | null | undefined;

  constructor() {
    super('PvpMap');
  }

  preload() {
    this.load.setPath('/assets');
    this.load.image({
      key: 'dark-forest-0',
      url: 'background/dark-forest/Layer_0011_0.png',
    });
    this.load.image({
      key: 'dark-forest-1',
      url: 'background/dark-forest/Layer_0009_2.png',
    });
    this.load.image({
      key: 'dark-forest-3',
      url: 'background/dark-forest/Layer_0008_3.png',
    });
    this.load.image({
      key: 'dark-forest-4',
      url: 'background/dark-forest/Layer_0007_Lights.png',
    });
    this.load.image({
      key: 'dark-forest-5',
      url: 'background/dark-forest/Layer_0006_4.png',
    });
    this.load.image({
      key: 'dark-forest-6',
      url: 'background/dark-forest/Layer_0005_5.png',
    });
    this.load.image({
      key: 'dark-forest-7',
      url: 'background/dark-forest/Layer_0003_6.png',
    });
    this.load.image({
      key: 'dark-forest-8',
      url: 'background/dark-forest/Layer_0002_7.png',
    });
    this.load.image({
      key: 'dark-forest-9',
      url: 'background/dark-forest/Layer_0001_8.png',
    });
    this.load.image({
      key: 'dark-forest-10',
      url: 'background/dark-forest/Layer_0000_9.png',
    });
    this.load.spritesheet('golem', 'character/boss/golem/Character_sheet.png', {
      frameWidth: 100,
      frameHeight: 100,
    });
    this.load.spritesheet('samurai', 'character/avatar/samurai/samurai.png', {
      frameWidth: 96,
      frameHeight: 96,
    });
    this.load.image({
      key: 'rec-box',
      url: 'UI/RectangleBox_96x96.png',
    });
    this.load.image({
      key: 'value-bar',
      url: 'UI/ValueBar_128x16.png',
    });
    this.load.image({
      key: 'value-blue',
      url: 'UI/ValueBlue_120x8.png',
    });
    this.load.image({
      key: 'value-red',
      url: 'UI/ValueRed_120x8.png',
    });
    this.load.image({
      key: 'host',
      url: 'noun.png',
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
    const { width, height } = this.scale;
    const scale = 1.75;
    const x = screenCenterX;
    const y = 350;
    // this.add.tileSprite(x, y, width, height, `dark-forest-0`).setScale(scale);
    this.add.tileSprite(x, y, width, height, `dark-forest-1`).setScale(scale);
    this.bg0 = this.add
      .tileSprite(x, y, width, height, `dark-forest-3`)
      .setScale(scale);
    this.bg1 = this.add
      .tileSprite(x, y, width, height, `dark-forest-4`)
      .setScale(scale);
    this.add.tileSprite(x, y, width, height, `dark-forest-5`).setScale(scale);
    this.bg2 = this.add
      .tileSprite(x, y, width, height, `dark-forest-6`)
      .setScale(scale);
    this.add.tileSprite(x, y, width, height, `dark-forest-7`).setScale(scale);
    this.add.tileSprite(x, y, width, height, `dark-forest-8`).setScale(scale);
    this.add.tileSprite(x, y, width, height, `dark-forest-9`).setScale(scale);
    this.add.tileSprite(x, y, width, height, `dark-forest-10`).setScale(scale);
    this.anims.create({
      key: 'golem_anim',
      frames: this.anims.generateFrameNames('golem', {
        frames: [0, 1, 2, 3],
        // frames: [10, 11, 12, 13, 14, 15, 16, 17],
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.add
      .sprite(screenCenterX + 400, screenCenterY + 150, 'golem')
      .setScale(4.5)
      .setFlipX(true)
      .play('golem_anim', true);
    this.anims.create({
      key: 'samurai_anim',
      frames: this.anims.generateFrameNames('samurai', {
        frames: [0, 1, 2, 3],
      }),
      frameRate: 7,
      repeat: -1,
    });
    this.add
      .sprite(screenCenterX - 400, screenCenterY + 150, 'samurai')
      .setScale(4.5)
      .setOrigin(0.5, 0.5)
      .play('samurai_anim', true);
    // stat
    this.add.image(200, 200, 'rec-box').setOrigin(0.5, 0.5).setScale(1.5);
    this.add.image(200, 200, 'host').setOrigin(0.5, 0.5).setScale(0.23);
    this.add.image(400, 200, 'value-bar').setOrigin(0.5, 0.5).setScale(2);
    this.add
      .image(400, 200, 'value-red')
      .setOrigin(0, 0.5)
      .setPosition(280, 200)
      .setDisplaySize(240, 16);
    this.add.text(280, 140, 'HOST').setFont('28px').setColor('#fff');
    this.add.text(350, 220, '100/100').setFont('24px').setColor('#fff');
    EventBus.emit('current-scene-ready', this);
  }

  update() {
    this.bg0.tilePositionX += 0.025;
    this.bg1.tilePositionX += 0.1;
    this.bg2.tilePositionX += 0.015;
  }

  changeScene() {
    if (this.logoTween) {
      this.logoTween.stop();
      this.logoTween = null;
    }
    this.scene.start('QuestMap');
  }
}
