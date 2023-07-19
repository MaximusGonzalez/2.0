import Win from "./public/assets/scenes/Win.js";
import GameOver from "./public/assets/scenes/GameOver.js";
import Nivel1 from "./public/assets/scenes/Nivel1.js";
import Nivel2 from "./public/assets/scenes/Nivel2.js";
import Nivel3 from "./public/assets/scenes/Nivel3.js";
import Start from "./public/assets/scenes/Start.js";
import Preload from "./public/assets/scenes/preloader.js";
import Niveles from "./public/assets/scenes/Niveles.js";
import Infinito from "./public/assets/scenes/Infinito.js";
import FinalScore from "./public/assets/scenes/FinalScore.js";
// Create a new Phaser config object
const config = {
  type: Phaser.AUTO,
  width: 240,
  height: 300,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 240,
      height: 300,
    },
    max: {
      width: 720,
      height: 900,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 2000 },
      debug: false,
    },
  },
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  scene: [Preload, Start, Niveles, Nivel1, Nivel2, Nivel3, Infinito, FinalScore, GameOver, Win],
  zoom: 1
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);

