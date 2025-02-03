import { Boot } from "./scenes/Boot";
import { Game } from "./scenes/Game";
import { GameOver } from "./scenes/GameOver";
import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
  type: Phaser.AUTO,
  width: "100%",
  height: "90%",
  parent: "game-container",
  backgroundColor: "#028af8",
  canvasStyle: "border: 5px solid white; max-width: 550px; max-height: 750px;",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
  },
  scene: [
    // Boot,
    // Preloader,
    // MainMenu,
    Game,
    GameOver,
  ],
  physics: {
    default: "matter",
    matter: {
      gravity: {
        y: 0.5,
      },
      debug: true,
    },
  },
  input: {
    gamepad: true,
  },
};

export default new Phaser.Game(config);
