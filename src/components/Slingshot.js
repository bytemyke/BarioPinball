export class Slingshot {
  constructor(scene, screenWidth, screenHeight, slingshotPipe) {
    this.scene = scene;
    this.screenHeight = screenHeight;
    this.slingshotPipe = slingshotPipe;
    this.screenWidth = screenWidth;
    this.isCharging = false;
    slingshotPipe.setCollisionByExclusion([-1, 0]);
    scene.matter.world.convertTilemapLayer(slingshotPipe);
    slingshotPipe.forEachTile((tile) => {
      if (tile.physics.matterBody !== undefined)
        tile.physics.matterBody.body.label = "slingshotTile";
    });
    this.scene.ball.x = screenWidth;
    this.scene.ball.y = screenHeight - slingshotPipe.y - 100;
  }

  fire(sound) {
    console.log("firing slingshot");
    this.charge();
  }

  charge() {
    this.isCharging = true;
    setTimeout(() => {
      this.release();
    }, 100);
  }

  release() {
    // this.constraint.stiffness = 0.0001;
    this.isCharging = false;
    // this.scene.matter.body.setPosition(this.scene.ball, { x: 465, y: 765 });
		this.scene.ball.setVelocity(0,-25 + this.scene.rand(-2, 2) );
		this.scene.matter.body.setAngularVelocity(this.scene.ball, 0);
  }
}
