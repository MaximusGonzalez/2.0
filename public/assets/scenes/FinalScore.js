export default class FinalScore extends Phaser.Scene {
    constructor(){
        super("FinalScore")
    }

    init({ score }) {
        this.score = score;
    }

    create(){
        
        this.add.image(118, 115,"PuntajeFinal")
        .setScale(1.6)
        this.scoreText = this.add.text(90, 125, "salamaleco" + this.score, {
        fontFamily: "Arial",
        fontSize: "50px",
        fill: "#FFFFFF",
      });

      this.scoreText.setText(this.score,);

        const boton2 = this.add.image(180, 250, "niveles").setScale(0.4);
        boton2.setInteractive();
        boton2.on("pointerup", () => {
        this.scene.start("Niveles");
        });
        const boton1 = this.add.image(60, 250, "reintentar").setScale(0.4);
        boton1.setInteractive();
        boton1.on("pointerup", () => {
        {
        this.scene.start("Infinito");
        }
        });
          
    }
}