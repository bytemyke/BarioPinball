import { Boot } from "./scenes/Boot";
import { Game } from "./scenes/Game";
import { GameOver } from "./scenes/GameOver";
import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";
import { Castle } from "./scenes/Castle";
import { Outside } from "./scenes/Outside";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig

const vh = window.innerHeight * 0.9;
const config = {
  type: Phaser.AUTO,
  width: "368",
  height: "672",
  parent: "game-container",
  backgroundColor: "#028af8",
  canvasStyle: "border: 5px solid white; border-radius: 10px;",
  resolution: 10, // the higher the better (but certainly slower)
  max: {
    width: 800,
    height: vh,
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
  },
  scene: [
    // Boot,
    Preloader,
    // MainMenu,
    Game,
    Castle,
    Outside,
    GameOver,
  ],
  physics: {
    default: "matter",
    matter: {
      gravity: {
        y: 0.5,
      },
      // debug: true,
    },
  },
  input: {
    gamepad: true,
  },
};

export default new Phaser.Game(config);
