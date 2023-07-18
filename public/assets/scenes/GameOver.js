export default class GameOver extends Phaser.Scene {
    constructor(){
        super("GameOver")
    }

    init({ stage }) {
        this.stage = stage;
    }

    create(){
        
        this.add.image(135, 160,"gameover")
        .setScale(4)

        const boton2 = this.add.image(180, 250, "niveles").setScale(0.4);
        boton2.setInteractive();
        boton2.on("pointerup", () => {
        this.scene.start("Niveles");
        });
        const boton1 = this.add.image(60, 250, "reintentar").setScale(0.4);
        boton1.setInteractive();
        boton1.on("pointerup", () => {
        if (this.stage === 1) {
        this.scene.start("nivel1");
        }
        else if (this.stage === 2) {
        this.scene.start("nivel2");
        }
        else if (this.stage === 3) {
        this.scene.start("nivel3");
        }
        else if (this.stage === 4) {
        this.scene.start("nivel4");
        }
        });
          
    }
}