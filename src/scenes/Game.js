import { Scene, Phaser } from "phaser";
import { Ball } from "../components/Ball.js";
import { LeftFlipper, RightFlipper } from "../components/Flipper.js";
import { createMap } from "../functions/createMap.js";
import { Slingshot } from "../components/Slingshot.js";
import { Launcher } from "../components/Launcher.js";

export class Game extends Scene {
  constructor() {
    super("Game");
    this.ballCount = 3;
    this.score = 0;
  }

  preload() {
    document
      .getElementById("game-container")
      .appendChild(document.getElementById("controller"));
    document.getElementById("controller").style.display = "flex";
  }

  create() {
    this.scene.start("Castle", {
      ballCount: this.ballCount,
      score: this.score,
    });
  }
}
