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
  const wallWidth = 4;
  const startingX = wallWidth * 1.1;
  const startingY = screenHeight - screenHeight / 80;
  console.log(startingX + screenWidth / 4.5)
  const JSONMap = {
    walls: [
      {
        x: 71,
        y: 505,
        width: wallWidth,
        height: 67,
        rotation: 0,
        color: 0x0000ff,
      },
      {
        x: screenWidth - 71 ,
        y: 505,
        width: wallWidth,
        height: 67,
        rotation: 0,
        color: 0x0000ff,
      },
      {
        x: 92,
        y: 510 + 45,
        width: wallWidth,
        height: 60,
        rotation: 40,
        color: 0x0000ff,
      },
      {
        x: screenWidth - 92 ,
        y: 510 + 45,
        width: wallWidth,
        height: 60,
        rotation: -40,
        color: 0x0000ff,
      }
      
      
     
    ],
    bumpers: [],
  };
  return JSONMap;
}
