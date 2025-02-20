import { Scene, Phaser } from "phaser";
import { Ball } from "../components/Ball.js";
import { LeftFlipper, RightFlipper } from "../components/Flipper.js";
import { createMap } from "../functions/createMap.js";
import { Slingshot } from "../components/Slingshot.js";
import { Launcher } from "../components/Launcher.js";

export class Outside extends Scene {
  init(data) {
    this.ballCount = data.ballCount;
    this.score = data.score;
  }
  constructor() {
    super("Outside");
  }
}
