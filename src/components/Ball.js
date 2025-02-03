import Phaser from "phaser";
export class Ball extends Phaser.Physics.Matter.Image {
  constructor(scene, x, y, scale, texture) {
    super(scene.matter.world, x, y, texture);
    this.setBody({
      type: "circle",
      radius: 50,
    });
    //  Just make the body move around and bounce
    this.setVelocity(6, 3);
    this.setAngularVelocity(0.01);
    this.setBounce(1);
    this.setFriction(0, 0, 0);
    this.setDepth(1);
    this.setScale(scale);
    this.scene.sys.displayList.add(this);
  }
}
