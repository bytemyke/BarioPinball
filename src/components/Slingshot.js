export class Slingshot {
  constructor(scene, screenWidth, screenHeight) {
    const ballWidth = scene.ball.displayWidth;
    const slingshotWidth = 16;
   
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
