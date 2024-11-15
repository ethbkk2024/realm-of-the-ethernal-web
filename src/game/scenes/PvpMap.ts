import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class PvpMap extends Scene {
  background: GameObjects.Image | undefined;

  private bg0!: Phaser.GameObjects.TileSprite;

  private bg1!: Phaser.GameObjects.TileSprite;

  private bg2!: Phaser.GameObjects.TileSprite;

  camera: Phaser.Cameras.Scene2D.Camera | undefined;

  logo: GameObjects.Image | undefined;

  player_hp: GameObjects.Text | undefined;

  player_hp_bar: Phaser.GameObjects.Image | undefined;

  boss_hp: GameObjects.Text | undefined;

  boss_hp_bar: Phaser.GameObjects.Image | undefined;

  logoTween: Phaser.Tweens.Tween | null | undefined;

  boss: Phaser.GameObjects.Image | undefined;

  player: Phaser.GameObjects.Image | undefined;

  dm_text: Phaser.GameObjects.Text | undefined;

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
    // this.load.spritesheet('golem', 'character/boss/golem/Character_sheet.png', {
    //   frameWidth: 100,
    //   frameHeight: 100,
    // });
    // this.load.spritesheet('samurai', 'character/avatar/samurai/samurai.png', {
    //   frameWidth: 96,
    //   frameHeight: 96,
    // });
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
      key: 'nft-player',
      url: 'character/avatar/knight.png',
    });
    this.load.image({
      key: 'boss-1',
      url: 'character/boss/boss-lv-1.png',
    });
    this.load.image({
      key: 'boss-2',
      url: 'character/boss/boss-lv-2.png',
    });
    this.load.image({
      key: 'boss-3',
      url: 'character/boss/boss-lv-3.png',
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
    const display_size = {
      width: this.scale.width,
      height: this.scale.height,
    };
    const width = 2000;
    const height = 768;
    const scale = 1.75;
    const x = screenCenterX;
    const y = 500;

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
    // this.anims.create({
    //   key: 'golem_anim',
    //   frames: this.anims.generateFrameNames('golem', {
    //     frames: [0, 1, 2, 3],
    //     // frames: [10, 11, 12, 13, 14, 15, 16, 17],
    //   }),
    //   frameRate: 10,
    //   repeat: -1,
    // });
    // this.boss = this.add
    //   .sprite(screenCenterX + 400, screenCenterY + 180, 'golem')
    //   .setScale(4.5)
    //   .setFlipX(true)
    //   .play('golem_anim', true);
    // this.anims.create({
    //   key: 'samurai_anim',
    //   frames: this.anims.generateFrameNames('samurai', {
    //     frames: [0, 1, 2, 3],
    //   }),
    //   frameRate: 7,
    //   repeat: -1,
    // });
    // this.add
    //   .sprite(screenCenterX - 400, screenCenterY + 150, 'samurai')
    //   .setScale(4.5)
    //   .setOrigin(0.5, 0.5)
    //   .play('samurai_anim', true);

    this.player = this.add
      .image(screenCenterX - 400, screenCenterY + 180, 'nft-player')
      .setDisplaySize(250, 250)
      .setOrigin(0.5, 0.5);
    // this.boss = this.add
    //   .image(screenCenterX + 400, screenCenterY + 120, 'boss-1')
    //   .setDisplaySize(400, 400)
    //   .setOrigin(0.5, 0.5);
    // stat
    this.add
      .image(display_size.width * 0.1, 200, 'rec-box')
      .setOrigin(0.5, 0.5)
      .setScale(1.5);
    this.add
      .image(display_size.width * (1 - 0.1), 200, 'rec-box')
      .setOrigin(0.5, 0.5)
      .setScale(1.5);
    this.add
      .image(display_size.width * 0.1, 200, 'nft-player')
      .setOrigin(0.5, 0.5)
      .setScale(0.23);
    // this.add
    //   .image(display_size.width * (1 - 0.1), 200, 'boss-1')
    //   .setOrigin(0.5, 0.5)
    //   .setScale(0.23);
    this.add
      .image(display_size.width * 0.175, 200, 'value-bar')
      .setOrigin(0.5, 0.5)
      .setScale(2);
    this.add
      .image(display_size.width * (1 - 0.175), 200, 'value-bar')
      .setOrigin(0.5, 0.5)
      .setScale(2);
    this.player_hp_bar = this.add
      .image(display_size.width * 0.13, 200, 'value-red')
      .setOrigin(0, 0.5)
      .setDisplaySize(240, 16);
    this.boss_hp_bar = this.add
      .image(display_size.width * (1 - 0.13), 200, 'value-red')
      .setOrigin(1, 0.5)
      .setDisplaySize(240, 16);
    this.player_hp = this.add
      .text(display_size.width * 0.175, 220, `--- / ---`)
      .setFont('24px')
      .setColor('#fff')
      .setOrigin(0.5, 0);
    this.boss_hp = this.add
      .text(display_size.width * (1 - 0.175), 220, `--- / ---`)
      .setFont('24px')
      .setColor('#fff')
      .setOrigin(0.5, 0);
    EventBus.emit('current-scene-ready', this);
  }

  handleInit(init: any) {
    this.camera = this.cameras.main;
    const screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
    if (init) {
      this.boss = this.add
        .image(screenCenterX + 400, screenCenterY + 120, `boss-${init.bossLv}`)
        .setDisplaySize(400, 400)
        .setFlipX(init.bossLv !== '1')
        .setOrigin(0.5, 0.5);
      this.add
        .image(this.scale.width * (1 - 0.1), 200, `boss-${init.bossLv}`)
        .setOrigin(0.5, 0.5)
        .setFlipX(init.bossLv !== '1')
        .setScale(0.23);
      this.boss_hp?.setText(
        `${init.initialStat.boss.hp}/${init.initialStat.boss.max_hp}`,
      );
      const ratioBoss =
        (init.initialStat.boss.hp * 100) / init.initialStat.boss.max_hp;
      const useWidthBoss = (ratioBoss * 240) / 100;
      this.boss_hp_bar?.setDisplaySize(useWidthBoss, 16);
      this.player_hp?.setText(
        `${init.initialStat.player.hp}/${init.initialStat.player.max_hp}`,
      );
      const ratioPlayer =
        (init.initialStat.player.hp * 100) / init.initialStat.player.max_hp;
      const useWidthPlayer = (ratioPlayer * 240) / 100;
      this.player_hp_bar?.setDisplaySize(useWidthPlayer, 16);
    }
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

  handleData(data: any) {
    const screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
    // this.player_hp?.setText(`${data.hp}/100`);
    // this.boss_hp?.setText(`${data.hp}/100`);

    data?.action_list.map((action: any, index: number) => {
      this.tweens.add({
        targets: action.attacker === 'player' ? this.player : this.boss, // The sprite we want to animate
        x:
          action.attacker === 'player'
            ? screenCenterX + 400
            : screenCenterX - 400, // The sprite we want to animate
        y: screenCenterY + 150, // Move it down to y = 300
        // scaleX: 1, // Double its width
        // scaleY: 1, // Double its height
        // alpha: 0, // Fade it out (alpha = 0)
        delay: index * 1000,
        duration: 1000, // 2 seconds
        ease: 'Back.easeIn', // Ease function for smoothness
        yoyo: true, // After reaching the target, animate it back to the start
        repeat: 0, // Loop the animation infinitely
      });
      if (action.attacker === 'boss') {
        setTimeout(
          () => {
            this.player_hp?.setText(`${action.hp}/${action.maxHp}`);
            const ratio = (action.hp * 100) / action.maxHp;
            const useWidth = (ratio * 240) / 100;
            this.player_hp_bar?.setDisplaySize(useWidth, 16);
            this.dm_text = this.add
              .text(screenCenterX - 400, screenCenterY, `${action.damage}`)
              .setFont('64px')
              .setColor('#ff0000')
              .setOrigin(0.5, 0.5);
          },
          (index + 1) * 1000,
        );
        setTimeout(
          () => {
            this.dm_text?.destroy();
          },
          (index + 2) * 1000,
        );
      } else if (action.attacker === 'player') {
        setTimeout(
          () => {
            this.boss_hp?.setText(`${action.hp}/${action.maxHp}`);
            const ratio = (action.hp * 100) / action.maxHp;
            const useWidth = (ratio * 240) / 100;
            this.boss_hp_bar?.setDisplaySize(useWidth, 16);
            this.dm_text = this.add
              .text(
                screenCenterX + 400,
                screenCenterY - 100,
                `${action.damage}`,
              )
              .setFont('64px')
              .setColor('#ff0000')
              .setOrigin(0.5, 0.5);
          },
          (index + 1) * 1000,
        );
        setTimeout(
          () => {
            this.dm_text?.destroy();
          },
          (index + 2) * 1000,
        );
      }
    });
    // this.tweens.add({
    //   targets: this.boss, // The sprite we want to animate
    //   x: screenCenterX - 400, // Animate the sprite to the right
    //   y: screenCenterY + 150, // Move it down to y = 300
    //   // scaleX: 1, // Double its width
    //   // scaleY: 1, // Double its height
    //   // alpha: 0, // Fade it out (alpha = 0)
    //   duration: 1000, // 2 seconds
    //   ease: 'Back.easeIn', // Ease function for smoothness
    //   yoyo: true, // After reaching the target, animate it back to the start
    //   repeat: 0, // Loop the animation infinitely
    // });
  }
}
