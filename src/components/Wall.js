export class Wall {
  constructor(scene, wall) {
    let rectangle = scene.add.rectangle(
      wall.x,
      wall.y,
      wall.width,
      wall.height,
      wall.color
    );
    this.body = scene.matter.add.gameObject(rectangle, {
      friction: 1,
      isStatic: true,
    });
    this.body.rotation = wall.rotation;
  }
}
