export default class Preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }


  preload() {
    this.load.tilemapTiledJSON("nivel", "./public/tilemaps/nivel.json");

    this.load.image(
      "Background Props",
      "./public/assets/images/Background Props.png"
    );
    this.load.image("enemy1", "./public/assets/images/enemy1.png");
    this.load.image("enemy2", "./public/assets/images/enemy2.png");
    this.load.image("triangle", "./public/assets/images/triangle.png");
    this.load.image("Base Color", "./public/assets/images/Base Color.png");
    this.load.image("Buildings", "./public/assets/images/Buildings.png");
    this.load.image("Frontal Fog", "./public/assets/images/Frontal Fog.png");
    this.load.image("Bullet", "./public/assets/images/Bullet.png");
    this.load.image("Props-01", "./public/assets/images/Props-01.png");
    this.load.image("Tiles", "./public/assets/images/Tiles.png");
    this.load.image("Zombie", "./public/assets/images/Zombie.png")
    this.load.image("deleter", "./public/assets/images/deleter.png");
    this.load.image("gameover", "./public/assets/images/gameover.png");
    this.load.image("logo", "./public/assets/images/logo.png");
    this.load.image("win", "./public/assets/images/win.png");

    this.load.spritesheet("dude", "./public/assets/images/dude.png", {
      frameWidth: 32,
      frameHeight: 38,
    });
  }

  create() {
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 3, end: 4 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 6 }),
      frameRate: 10,
      repeat: -1,
    });
  
    this.scene.start('game')

  }
}
