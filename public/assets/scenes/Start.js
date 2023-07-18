export default class Start extends Phaser.Scene {
    constructor(){
        super("Start")
    }
    create(){
      this.add.image(115, 160,"Logo")
      .setScale(1);

      const jugar = this.add.image(180, 260, "jugar").setScale(0.5);
      jugar.setInteractive();
      jugar.on("pointerup", () => {
      this.scene.start("Niveles");
    }); 
    }
}