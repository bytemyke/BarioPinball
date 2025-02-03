import { Scene } from "phaser";
import { Ball } from "../components/Ball.js";
import { LeftFlipper, RightFlipper } from "../components/Flipper.js";
import { createMap } from "../functions/createMap.js";
import { Slingshot } from "../components/Slingshot.js";
import { Launcher } from "../components/Launcher.js";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  preload() {
    this.load.image("flipper", "/assets/flipper.png");
    this.load.image("ball", "/assets/ball.png");
    this.load.image("wall", "/assets/wall.png");

    document
      .getElementById("game-container")
      .appendChild(document.getElementById("controller"));
    document.getElementById("controller").style.display = "flex";
  }

  create() {
    this.matter.world.setBounds();
    let { width, height } = this.sys.game.canvas;
    const CENTER = {
      x: this.cameras.main.centerX,
      y: this.cameras.main.centerY,
    };
    this.sensorGroupA = this.matter.world.nextCategory(); // Ground level sensors
    this.sensorGroupB = this.matter.world.nextCategory(); // Upper level sensors
    this.collisionGroupA = this.matter.world.nextCategory(); // Ball
    this.collisionGroupB = this.matter.world.nextCategory(); // Walls
    this.collisionGroupC = this.matter.world.nextCategory();
    this.collisionGroupD = this.matter.world.nextCategory();
    this.collisionGroupE = this.matter.world.nextCategory();
    this.leftFlipper = new LeftFlipper(
      this,
      CENTER.x - CENTER.x / 3,
      height - height / 8,

      "flipper"
    );
    this.rightFlipper = new RightFlipper(
      this,
      CENTER.x + CENTER.x / 3,
      height - height / 8,
      "flipper"
    );
    const ballScale = (height + CENTER.x) / 3459;
    console.log(ballScale);
    this.ball = new Ball(this, 200, 50, ballScale, "ball");
    this.Slingshot = new Slingshot(this, width, height);

    // this.slingshot = new Slingshot(
    //   this
    // )
    this.createInputs();
    createMap(this, width, height);
  }

  update() {}
  createInputs() {
    const scene = this;
    var keyObject = scene.input.keyboard.addKey("a"); // Get key object
    keyObject.on("down", function (event) {
      scene.leftFlipper.flip(true);
    });
    keyObject.on("up", function (event) {
      scene.leftFlipper.flip(false);
    });
    var keyObject = scene.input.keyboard.addKey("d"); // Get key object
    keyObject.on("down", function (event) {
      scene.rightFlipper.flip(true);
    });
    keyObject.on("up", function (event) {
      scene.rightFlipper.flip(false);
    });
  }
}
