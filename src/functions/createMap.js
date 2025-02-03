import { Wall } from "../components/Wall";
export function createMap(scene, screenWidth, screenHeight) {
  console.log("creating walls");
  scene.walls = scene.add.group();
  const map = createJSON(screenWidth, screenHeight);
  map.walls.forEach((wall) => {
    scene.walls.add(new Wall(scene, wall).body);
  });
}

function createJSON(screenWidth, screenHeight) {
  const wallWidth = screenWidth / 60 / 2;
  const startingX = wallWidth * 1.1;
  const startingY = screenHeight - screenHeight / 80;
  const JSONMap = {
    walls: [
      {
        x: startingX + screenWidth / 4.5,
        y: startingY - screenHeight / 3.8,
        width: wallWidth,
        height: screenHeight / 6,
        rotation: 0,
        color: 0x0000ff,
      },
      {
        x: screenWidth - (startingX + screenWidth / 4.5),
        y: startingY - screenHeight / 3.8,
        width: wallWidth,
        height: screenHeight / 6,
        rotation: 0,
        color: 0x0000ff,
      },
      {
        x: startingX + screenWidth / 4.5 + screenWidth / 20,
        y: startingY - screenHeight / 4.5 + screenHeight / 6 / 2.65,
        width: wallWidth,
        height: screenHeight / 6 / 2,
        rotation: 200,
        color: 0x0000ff,
      },
      {
        x: screenWidth - (startingX + screenWidth / 4.5) - screenWidth / 20,
        y: startingY - screenHeight / 4.5 + screenHeight / 6 / 2.65,
        width: wallWidth,
        height: screenHeight / 6 / 2,
        rotation: -200,
        color: 0x0000ff,
      },

      {
        x: startingX + wallWidth * 12,
        y: startingY - screenHeight / 4.5 + screenHeight / 6 / 2.65,
        width: wallWidth,
        height: screenHeight / 4,
        rotation: 200,
        color: 0x0000ff,
      },
      {
        x: screenWidth - (startingX + screenWidth / 4.5) + screenWidth / 20,
        y: startingY - screenHeight / 4.5 + screenHeight / 6 / 2.65,
        width: wallWidth,
        height: screenHeight / 6 / 2,
        rotation: 200,
        color: 0x0000ff,
      },
      //left wall
      {
        x: startingX,
        y: screenHeight / 2,
        width: wallWidth,
        height: screenHeight,
        rotation: 0,
        color: 0x0000ff,
      },
    ],
    bumpers: [],
  };
  return JSONMap;
}
