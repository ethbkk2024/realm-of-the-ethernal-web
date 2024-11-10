import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class QuestMap extends Scene {
  background: GameObjects.Image | undefined;

  camera: Phaser.Cameras.Scene2D.Camera | undefined;

  logo: GameObjects.Image | undefined;

  title: GameObjects.Text | undefined;

  logoTween: Phaser.Tweens.Tween | null | undefined;

  constructor() {
    super('QuestMap');
  }

  preload() {
    this.load.setPath('assets');
    this.load.image({
      key: 'land-a',
      url: 'land/land-a.png',
    });
    this.load.image({
      key: 'land-b',
      url: 'land/land-b.png',
    });
    this.load.image({
      key: 'land-c',
      url: 'land/land-c.png',
    });
    this.load.spritesheet('cow', 'sprite-sheet/spr_deco_cow_strip4.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('sheep', 'sprite-sheet/Sheep.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('chicken-right', 'sprite-sheet/Chicken-right.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create() {
    this.camera = this.cameras.main;
    // this.cameras.main.setBounds(0, 0, 100, 100);
    this.camera.setBackgroundColor(0x5395fe);
    const screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
    // this.background = this.add.image(0, 0, 'bg').setOrigin(0, 0);
    // const bg = this.add.sprite(0, 0, 'bg');
    // bg.setOrigin(0, 0);
    // this.logo = this.add.image(512, 300, 'logo').setDepth(100);

    // this.add.sprite(screenCenterX, screenCenterY, 'map').setOrigin(0.5, 0.5);
    this.add
      .sprite(screenCenterX - 250, screenCenterY - 175, 'land-a')
      .setOrigin(0.5, 0.5);
    this.add
      .sprite(screenCenterX + 250, screenCenterY - 175, 'land-b')
      .setOrigin(0.5, 0.5);
    this.add
      .sprite(screenCenterX, screenCenterY + 175, 'land-c')
      .setOrigin(0.5, 0.5);
    this.anims.create({
      key: 'cow_anim',
      frames: this.anims.generateFrameNames(
        'cow',
        // , { frames: [0, 1, 2, 3] }
      ),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'sheep_anim',
      frames: this.anims.generateFrameNames('sheep'),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'chicken_right_anim',
      frames: this.anims.generateFrameNames('chicken-right', {
        frames: [0, 1, 2, 3],
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.add
      .sprite(screenCenterX - 200, screenCenterY - 100, 'cow')
      .setScale(1)
      .play('cow_anim', true);
    this.add
      .sprite(screenCenterX - 250, screenCenterY - 100, 'sheep')
      .setScale(1)
      .play('sheep_anim', true);

    Array(4)
      .fill('mock')
      .map((res: any, index: number) =>
        this.add
          .sprite(
            screenCenterX - 225 - index * 20,
            screenCenterY - 150,
            'chicken_right',
          )
          .setScale(1)
          .play('chicken_right_anim', true)
          .setInteractive()
          .on('pointerdown', () => {
            console.log(`res - ${index}`);
          }),
      );

    // this.title = this.add
    //   .text(screenCenterX, screenCenterY, 'START', {
    //     fontFamily: 'Arial Black',
    //     fontSize: 38,
    //     color: '#ffffff',
    //     stroke: '#000000',
    //     strokeThickness: 8,
    //     align: 'center',
    //   })
    //   .setOrigin(0.5, 0.5);
    // .setDepth(100);

    EventBus.emit('current-scene-ready', this);
    const camera: any = this.cameras.main;
    camera.zoom = Phaser.Math.Clamp(1.5, 1, 40);
    camera.preRender();
    let cameraDragStartX: any;
    let cameraDragStartY: any;
    this.input.on('pointerdown', () => {
      cameraDragStartX = camera.scrollX;
      cameraDragStartY = camera.scrollY;
    });
    this.input.on('pointermove', (pointer: any) => {
      if (pointer.isDown) {
        camera.scrollX =
          cameraDragStartX + (pointer.downX - pointer.x) / camera.zoom;
        camera.scrollY =
          cameraDragStartY + (pointer.downY - pointer.y) / camera.zoom;
      }
    });
    this.input.on(
      'wheel',
      (pointer: any, gameObjects: any, deltaX: any, deltaY: any) => {
        // Get the current world point under pointer.
        if (camera) {
          // Get the current world point under pointer.
          const worldPoint = camera.getWorldPoint(pointer.x, pointer.y);
          const newZoom = camera.zoom - camera.zoom * 0.001 * deltaY;
          camera.zoom = Phaser.Math.Clamp(newZoom, 1, 40);
          // Update camera matrix, so `getWorldPoint` returns zoom-adjusted coordinates.
          camera.preRender();
          const newWorldPoint = camera.getWorldPoint(pointer.x, pointer.y);
          // Scroll the camera to keep the pointer under the same world point.
          camera.scrollX -= newWorldPoint.x - worldPoint.x;
          camera.scrollY -= newWorldPoint.y - worldPoint.y;
        }
      },
    );
    // const gridSize = 32; // Size of each cell in the grid
    // const graphics = this.add.graphics({
    //   lineStyle: { width: 1, color: 0x000000 },
    // });
    //
    // // Draw vertical lines
    // for (let x = 0; x < this.cameras.main.width; x += gridSize) {
    //   graphics.lineBetween(x, 0, x, this.cameras.main.height);
    // }
    //
    // // Draw horizontal lines
    // for (let y = 0; y < this.cameras.main.height; y += gridSize) {
    //   graphics.lineBetween(0, y, this.cameras.main.width, y);
    // }
    // for (let x = 0; x < this.cameras.main.width; x += gridSize) {
    //   for (let y = 0; y < this.cameras.main.height; y += gridSize) {
    //     this.add.text(x + 2, y + 2, `${x}`, {
    //       fontSize: '10px',
    //       color: '#000',
    //     });
    //     this.add.text(x + 2, y + 14, `${y}`, {
    //       fontSize: '10px',
    //     });
    //   }
    // }
  }

  changeScene() {
    if (this.logoTween) {
      this.logoTween.stop();
      this.logoTween = null;
    }

    this.scene.start('Game');
  }

  moveLogo(reactCallback: ({ x, y }: { x: number; y: number }) => void) {
    if (this.logoTween) {
      if (this.logoTween.isPlaying()) {
        this.logoTween.pause();
      } else {
        this.logoTween.play();
      }
    } else {
      this.logoTween = this.tweens.add({
        targets: this.logo,
        x: { value: 750, duration: 3000, ease: 'Back.easeInOut' },
        y: { value: 80, duration: 1500, ease: 'Sine.easeOut' },
        yoyo: true,
        repeat: -1,
        onUpdate: () => {
          if (reactCallback) {
            if (this.logo) {
              reactCallback({
                x: Math.floor(this.logo.x),
                y: Math.floor(this.logo.y),
              });
            }
          }
        },
      });
    }
  }
}