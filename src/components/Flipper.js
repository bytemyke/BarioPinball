import Phaser from "phaser";
/**
 * A flipper for the pinball game. It can be either a left or right flipper.
 * The flipper is a Matter.js body which can be rotated by the user. The
 * rotation is done by tweening the angle of the flipper over time.
 */
export class Flipper {
  constructor(scene, x, y, orientation, texture) {
    this.X = x;
    this.Y = y;
    this.orientation = orientation;
    this.orientation == "left" ? (this.LEVER = 64) : (this.LEVER = 64);
    this.width = scene.cameras.main.centerX / 3;
    this.height = scene.cameras.main.centerY / 25;

    var STIFFNESS = 0.1;
    this.MIN = Phaser.Math.DegToRad(32);
    this.max = Phaser.Math.DegToRad(-15);

    if (orientation == "left") {
      this.MIN = Phaser.Math.DegToRad(32);
      this.max = Phaser.Math.DegToRad(-15);
    } else {
      // this.MIN = Phaser.Math.DegToRad(32) * -1;
      // this.MIN = Phaser.Math.DegToRad(32)      * -1;
    }
    this.scene = scene;
    this.scene.tweener = {
      x: this.MIN,
    };

    var rectangle = scene.add.rectangle(
      this.X,
      this.Y,
      this.width,
      this.height,
      0x0000ff
    );

    scene.add.existing(rectangle);

    var body = scene.matter.add.gameObject(rectangle, {
      friction: 1,
    });

    scene.matter.add.worldConstraint(body, 0, 1, {
      pointA: new Phaser.Math.Vector2(this.X, this.Y),
      pointB: new Phaser.Math.Vector2((this.width - this.height) / 2, 0),
    });
    let leverX = this.X - Math.cos(scene.tweener.x) * this.LEVER;
    let leverY = this.Y - Math.sin(scene.tweener.x) * this.LEVER;
    if (orientation == "right") {
      leverX = this.X - Math.cos(scene.tweener.x) * (this.LEVER * -1);
    }
    this.lever = scene.matter.add
      .image(leverX, leverY, null, null, {
        isSensor: true,
        isStatic: true,
      })
      .setVisible(false);

    scene.matter.add.constraint(body, this.lever.body, 0, STIFFNESS, {
      pointA: new Phaser.Math.Vector2(
        (this.width - this.height) / 2 + this.LEVER,
        0
      ),
      pointB: new Phaser.Math.Vector2(),
    });
  }
  flip(isDown) {
    const FLIPPER = this;
    FLIPPER.scene.tweens.add({
      targets: [FLIPPER.scene.tweener],
      x: isDown ? FLIPPER.max : FLIPPER.MIN,
      duration: 50,
      onUpdateScope: FLIPPER.scene,
      onUpdate: function () {
        if (FLIPPER.orientation == "left") {
          FLIPPER.lever.setPosition(
            FLIPPER.X - Math.cos(FLIPPER.scene.tweener.x) * FLIPPER.LEVER,
            FLIPPER.Y - Math.sin(FLIPPER.scene.tweener.x) * FLIPPER.LEVER
          );
        } else {
          FLIPPER.lever.setPosition(
            FLIPPER.X -
              Math.cos(FLIPPER.scene.tweener.x) * (FLIPPER.LEVER * -1),
            FLIPPER.Y - Math.sin(FLIPPER.scene.tweener.x) * FLIPPER.LEVER
          );
        }
      },
    });
  }
  release() {}
}
export class LeftFlipper extends Flipper {
  constructor(scene, x, y, texture) {
    const orientation = "left";
    super(scene, x, y, orientation, texture);
  }
}

export class RightFlipper extends Flipper {
  constructor(scene, x, y, texture) {
    const orientation = "right";
    super(scene, x, y, orientation, texture);
  }
}
