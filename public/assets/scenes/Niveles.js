export default class Niveles extends Phaser.Scene {
    constructor() {
      super("Niveles");
    }
  
    create() {

      const boton1 = this.add.image(120, 40, "nivel1").setScale(0.7);
      boton1.setInteractive();
      boton1.on("pointerup", () => {
        this.scene.start("nivel1");
      });

      const boton2 = this.add.image(120, 110, "nivel2").setScale(0.7);
      boton2.setInteractive();
      boton2.on("pointerup", () => {
        this.scene.start("nivel2");
      });
  
      const boton3 = this.add.image(120, 180, "nivel3").setScale(0.7);
      boton3.setInteractive();
      boton3.on("pointerup", () => {
        this.scene.start("nivel3");
      });

      const botoninfinito = this.add.image(120, 250, "infinito").setScale(0.7);
      botoninfinito.setInteractive();
      botoninfinito.on("pointerup", () => {
        this.scene.start("Infinito");
      });
    }
  }