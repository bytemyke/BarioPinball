import { Scene, Phaser } from "phaser";
import { Ball } from "../components/Ball.js";
import { LeftFlipper, RightFlipper } from "../components/Flipper.js";
import { createMap } from "../functions/createMap.js";
import { Slingshot } from "../components/Slingshot.js";
import { Launcher } from "../components/Launcher.js";

export class Castle extends Scene {
  init(data) {
    this.ballCount = data.ballCount;
    this.score = data.score;
  }
  constructor() {
    super("Castle");
    this.world = "Castle";
  }
  create() {
    const map = this.make.tilemap({
      key: "castleMap",
    });
    const tileset = map.addTilesetImage("gandc", "gandc");
    const tileset2 = map.addTilesetImage("decorations", "decorations");
    const backgroundLayer = map.createLayer("background", tileset, 0, 0);
    const wallLayer = map.createLayer("wall", tileset, 0, 0);
    const groundLayer = map.createLayer("ground", tileset, 0, 0);
    const ceilingLayer = map.createLayer("ceiling", tileset, 0, 0);
    const slingshotPipe = map.createLayer("slingshotPipe", tileset2, 0, 0);
    const teleportPortal = map.createLayer("teleportPortal", tileset2, 0, 0);
    const slingshotGliderLayer = map.createLayer(
      "slingshotGlider",
      tileset,
      0,
      0
    );
    // wallLayer.setCollisionByProperty({ collides: true });
    wallLayer.setCollisionByExclusion([-1, 0]);
    ceilingLayer.setCollisionByExclusion([-1, 0]);
    groundLayer.setCollisionByExclusion([-1, 0]);
    this.matter.world.convertTilemapLayer(wallLayer);
    this.matter.world.convertTilemapLayer(groundLayer);
    this.matter.world.convertTilemapLayer(ceilingLayer);

    // map.createLayer("Pipe", tileset);
    let { width, height } = this.sys.game.canvas;
    const CENTER = {
      x: this.cameras.main.centerX,
      y: this.cameras.main.centerY,
    };
    // this.sensorGroupA = this.matter.world.nextCategory(); // Ground level sensors
    // this.sensorGroupB = this.matter.world.nextCategory(); // Upper level sensors
    // this.collisionGroupA = this.matter.world.nextCategory(); // Ball
    // this.collisionGroupB = this.matter.world.nextCategory(); // Walls
    // this.collisionGroupC = this.matter.world.nextCategory();
    // this.collisionGroupD = this.matter.world.nextCategory();
    // this.collisionGroupE = this.matter.world.nextCategory();
    this.leftFlipper = new LeftFlipper(this, 119 - 18, 583.625, "flipper");
    this.rightFlipper = new RightFlipper(this, 238 - 20, 583.625, "flipper");
    this.ball = new Ball(this, 200, 50, "ball");
    this.slingShot = new Slingshot(this, width, height, slingshotPipe);

    this.createInputs();
    createMap(this, width, height);
    // this.createCollision();
    this.matter.world.setBounds();
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
  /**
   * Sets up collision handling for the game using Matter.js physics.
   * This function listens for collision start events in the Matter.js world.
   * When a ball collides with a dangerous tile, it initiates a tween effect
   * to fade out and remove the ball from the world. It ensures each ball is
   * processed only once per collision event by setting an isBeingDestroyed flag.
   */

  rand(min, max) {
    return Math.random() * (max - min) + min;
  }
}
