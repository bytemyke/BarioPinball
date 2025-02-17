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
    this.sensorGroupA = this.matter.world.nextCategory(); // Ground level sensors
    this.sensorGroupB = this.matter.world.nextCategory(); // Upper level sensors
    this.collisionGroupA = this.matter.world.nextCategory(); // Ball
    this.collisionGroupB = this.matter.world.nextCategory(); // Walls
    this.collisionGroupC = this.matter.world.nextCategory();
    this.collisionGroupD = this.matter.world.nextCategory();
    this.collisionGroupE = this.matter.world.nextCategory();
    this.leftFlipper = new LeftFlipper(this, 119 - 18, 583.625, "flipper");
    this.rightFlipper = new RightFlipper(this, 238 - 20, 583.625, "flipper");
    this.ball = new Ball(this, 200, 50, "ball");
    this.slingShot = new Slingshot(this, width, height, slingshotPipe);

    this.createInputs();
    createMap(this, width, height);
    this.createCollision();
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

  createCollision() {
    this.matter.world.on(
      "collisionstart",
      function (event) {
        for (let i = 0; i < event.pairs.length; i++) {
          // The tile bodies in this example are a mixture of compound bodies and simple rectangle
          // bodies. The "label" property was set on the parent body, so we will first make sure
          // that we have the top level body instead of a part of a larger compound body.
          const bodyA = event.pairs[i].bodyA;
          const bodyB = event.pairs[i].bodyB;
          if (
            ((bodyA.label === "ball" && bodyB.label === "slingshotTile") ||
              (bodyB.label === "ball" && bodyA.label === "slingshotTile")) &&
            !this.slingShot.isCharging
          ) {
            const ballBody = bodyA.label === "ball" ? bodyA : bodyB;
            const ball = ballBody.gameObject;
            ball.setVelocity(0, 0);
            this.slingShot.fire();
            // A body may collide with multiple other bodies in a step, so we'll use a flag to
            // only tween & destroy the ball once.
            // if (ball.isBeingDestroyed) {
            //   continue;
            // }
            // ball.isBeingDestroyed = true;
            // this.matter.world.remove(ballBody);

            // this.tweens.add({
            //   targets: ball,
            //   alpha: { value: 0, duration: 150, ease: "Power1" },
            //   onComplete: ((ball) => {
            //     ball.destroy();
            //   }).bind(this, ball),
            // });
          }
        }
      },
      this
    );
  }
}
