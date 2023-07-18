export default class Nivel2 extends Phaser.Scene {
  constructor() {
    super("nivel2");
  }

  create() {

    this.time.addEvent({
      delay: 500,
      callback: this.spawn1,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.spawn2,
      callbackScope: this,
      loop: true,
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.onSecond,
      callbackScope: this,
      loop: true,
    });

    this.physics.world.setBounds(0, 0, 240, 480);
    //creo el mapa nivel
    const map = this.make.tilemap({ key: "nivel" });

    //creo los tilesets y los emparejo con sus respectibas imagenes (nombre de tileset en tiled y nombre de la imagen usada para crearlo)
    const tileset1 = map.addTilesetImage("Base Color", "Base Color");
    const tileset2 = map.addTilesetImage("Buildings", "Buildings");
    const tileset3 = map.addTilesetImage("Frontal Fog", "Frontal Fog");
    const tileset4 = map.addTilesetImage("Props-01", "Props-01");
    const tileset5 = map.addTilesetImage("Tiles", "Tiles");

    //creo backgrounds y los emparejo con sus respectivos tilesets (nombre de capa en tiled, nombre de tiled usado para crearla, x, y)
    //para mantenerlo simple se recomienda usar solo un tileset por capa. Mantener valores de x, y, en 0
    const backgroundLayer1 = map.createLayer("patrones1", tileset1, 0, 0);
    const backgroundLayer2 = map.createLayer("patrones2", tileset3, 0, 0);
    const backgroundLayer3 = map.createLayer("patrones3", tileset2, 0, 0);
    const backgroundLayer4 = map.createLayer("patrones4", tileset2, 0, 0);
    const backgroundLayer5 = map.createLayer("patrones5", tileset2, 0, 0);
    const backgroundLayer6 = map.createLayer("patrones6", tileset5, 0, 0);
    const backgroundLayer7 = map.createLayer("patrones7", tileset4, 0, 0);
    const backgroundLayer8 = map.createLayer("patrones8", tileset4, 0, 0);

    //añado coliders
    backgroundLayer6.setCollisionByProperty({ colider: true });

    //creo spawnpoint de objeto (nombre de capa en la que se encuentra el objeto en tiled, (obj) => obj.name === nombre del objeto en tiled)
    const spawnPoint = map.findObject(
      "objetos1",
      (obj) => obj.name === "personaje"
    );


   // const zombieSpawn = map.findObject(
    //  "objetos1",
   //   (obj) => obj.name === "zombie"
    //);

    // creo al jugador (x, y, son tomados del spawnpoint creado con spawnPoint.x, spawnPoint.y, nombre de imagen usada para el personaje)
    this.player = this.physics.add
      .sprite(spawnPoint.x, spawnPoint.y, "dude")
      .setCollideWorldBounds(true)
      .setSize(22, 25)
      .setOffset(5, 13)
      
    this.bullets = this.physics.add.group({
      inmovable: true,
      allowGravity: false,
    });

    this.enemy1 = this.physics.add.group({
      allowGravity: false,
    })
    this.enemy2 = this.physics.add.group({
      allowGravity: false,
    })

    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(this.player, backgroundLayer6);
    this.physics.add.overlap(
      this.enemy1,
      this.bullets,
      this.reduce1,
      null,
      this
    );
    this.physics.add.overlap(
      this.enemy2,
      this.bullets,
      this.reduce2,
      null,
      this
    );
    this.physics.add.collider(
      this.enemy2,
      backgroundLayer6,
      this.killenemy2,
      null,
      this
    );
    this.physics.add.collider(
      this.enemy1,
      backgroundLayer6,
      this.killenemy1,
      null,
      this
    );
    this.physics.add.collider(
      this.bullets,
      backgroundLayer6,
      this.killbullet,
      null,
      this
    );
    this.physics.add.overlap(
      this.enemy1,
      this.player,
      this.gameover1,
      null,
      this
    );
    this.physics.add.overlap(
      this.enemy2,
      this.player,
      this.gameover2,
      null,
      this
    );

    this.cameras.main.startFollow(this.player);
    this.cameras.main.setViewport(0, 0, 240, 300);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.input.on("pointerdown", (pointer) => {
      let speed = 350;

      // create bullet
      let bullet = this.physics.add
        .image(this.player.x, this.player.y -18, "Bullet")
        .setScale(1)
        .setCircle(4, 0.5, 0.5)
        setTimeout(() => bullet.destroy(), 2000);

      // DEMO: to shoot in a straightline, just comment the following line in

      // DEMO: QuickFix to destroy the bullet after 1 Second automatically
      // setTimeout(() => bullet.destroy(), 1000);

      // add bullet to group
      this.bullets.add(bullet);
      this.physics.moveTo(
        bullet,
        this.input.mousePointer.x,
        this.input.mousePointer.y + 180,
        speed
      );
      this.physics.add.overlap(
        this.enemy2,
        this.bullets,
        this.reduce2,
        null,
        this
      );
      this.physics.add.overlap(
        this.enemy1,
        this.bullets,
        this.reduce1,
        null,
        this
      );
      //bullet.body.setVelocity(vector.x, vector.y);
    });

    // add timer
    this.timer = 30;
    this.timerText = this.add.text(10, 290, "Sobrevive otros " + this.timer + " segundos.", {
      fontFamily: "Arial",
      fontSize: "12px",
      fill: "#FFFFFF",
    });
    
    this.stage = 2;

  }

  update() {

    //move left
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
    }
    //move right
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
    }
    //stop
    else if (this.player.body.blocked.down) {
      this.player.setVelocityX(0);
    }

    //jump
    if (this.cursors.up.isDown && this.player.body.blocked.down) {
     this.player.setVelocityY(-500);
    }
    //movement animations
    if (this.cursors.left.isDown && this.player.body.blocked.down) {
      this.player.anims.play("left", true);
    }
    else if (this.cursors.right.isDown && this.player.body.blocked.down) {
      this.player.anims.play("right", true);
    }
    else if (this.player.body.blocked.down) {
      this.player.anims.play("turn", true);
    }
    else {
      this.player.anims.play("jump", true);
    }
  }

  spawn1() {
    const randomX = Phaser.Math.RND.between(16, 224);

    this.enemy1.create(randomX, 0, "enemy1")
    .setSize(32, 32)
      .setBounce(0.8)
      .setData("life", 2);
    this.enemy1.setVelocityY(70);

  }

  spawn2() {
    const randomX = Phaser.Math.RND.between(16, 224);

    this.enemy2.create(randomX, 0, "enemy2")
      .setScale(1)
      .setCircle(16, 0, 0)
      .setBounce(0.8)
      .setData("life", 10);
    this.enemy2.setVelocityY(200);

  }

  reduce2(enemy2, bullet){
    const lifeleft = enemy2.getData("life") - 1;
    enemy2.setData("life", lifeleft);
    if (lifeleft <= 0) {
      enemy2.destroy(true, true);
      bullet.destroy(true, true);
      return;
    }
    bullet.destroy();
  }
  reduce1(enemy1, bullet){
    const lifeleft = enemy1.getData("life") - 1;
    enemy1.setData("life", lifeleft);
    if (lifeleft <= 0) {
      enemy1.destroy(true, true);
      bullet.destroy(true, true);
      return;
    }
    else {bullet.destroy();}
  }
  
  killenemy2(enemy2, backgroundLayer6) {
  enemy2.destroy();
  }
  killenemy1(enemy1, backgroundLayer6) {
    enemy1.destroy();
  }
  killbullet(bullet, backgroundLayer6) {
  bullet.destroy();
  }

  gameover2(enemy2, player) {
    this.scene.start("GameOver", {
      stage: this.stage,
    });
  }
  gameover1(enemy1, player) {
    this.scene.start("GameOver", {
      stage: this.stage,
    });
  }

  onSecond(){
    this.timer--;
    this.timerText.setText("Sobrevive otros " + this.timer + " segundos.",);
    if(this.timer <= 0){
    this.scene.start("Win", {
      stage: this.stage,
    });
    }
  }
}
