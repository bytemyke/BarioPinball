export class Slingshot {
  constructor(scene, screenWidth, screenHeight) {
    const ballWidth = scene.ball.displayWidth;
    const slingshotWidth = scene.rightFlipper.width / 8;
    const spaceBetween = ballWidth + slingshotWidth;
    console.log(slingshotWidth);
    this.scene = scene;
    this.x = 0;
    this.y = 0;
    console.log(screenHeight);
    this.wallOne = scene.matter.add.gameObject(
      scene.add.rectangle(
        screenWidth,
        screenHeight / 2,
        slingshotWidth,
        screenHeight,
        0x0000ff
      ),
      {
        friction: 1,
        isStatic: true,
      }
    );
    this.wallTwo = scene.matter.add.gameObject(
      scene.add.rectangle(
        screenWidth - spaceBetween,
        screenHeight / 2,
        slingshotWidth,
        screenHeight,
        0x0000ff
      ),
      {
        friction: 1,
        isStatic: true,
      }
    );

    this.sling = scene.matter.add.gameObject(
      scene.add.rectangle(
        screenWidth - spaceBetween / 2,
        screenHeight,
        spaceBetween,
        screenHeight,
        0x91c520
      ),
      {
        friction: 1,
        isStatic: true,
      }
    );
  }

  fire(sound) {
    // let sounds = ["SlingshotLeft", "SlingshotRight"]
    // this.scene.sound.playAudioSprite('sound_effects', sounds[Math.floor(Math.random()*sounds.length)])
    // this.constraint.stiffness = .5
    // setTimeout(()=>{
    //     this.constraint.stiffness = .0001
    // }, 20)
  }

  charge() {}

  release() {
    this.constraint.stiffness = 0.0001;
  }
}
