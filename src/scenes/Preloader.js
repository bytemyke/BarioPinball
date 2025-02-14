import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here
    this.add.image(512, 384, "background");

    //  A simple progress bar. This is the outline of the bar.
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on("progress", (progress) => {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath("assets");
    this.load.image("logo", "logo.png");
    console.log('loading')
    this.load.image(
      "gandc", 
      "paidAssets/Cartoon-Classic-16x16/Ground-and-Ceiling.png"
    );
    this.load.image(
      "decorations", 
      "paidAssets/Cartoon-Classic-16x16/Decorations.png"
    );
    this.load.tilemapTiledJSON("castleMap", "tilesets/castle.json");
    this.load.image("ball", "pinball/ball.png");
  }

  create() {
    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    // this.scene.start('MainMenu');
    this.scene.start("Game");
  }
}
