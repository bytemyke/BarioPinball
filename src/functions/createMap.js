//Main color : #0C00FE 
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
  const wallColor = 0x060088;
  console.log(startingX + screenWidth / 4.5)
  const JSONMap = {
    walls: [
      {
        x: 52,
        y: 505,
        width: wallWidth,
        height: 67,
        rotation: 0,
        color: wallColor,
      },
      {
        x: screenWidth - 91,
        y: 505,
        width: wallWidth,
        height: 67,
        rotation: 0,
        color: wallColor,
      },
      {
        x: 77,
        y: 510 + 50,
        width: wallWidth,
        height: 65,
        rotation: 40,
        color: wallColor,
      },
      {
        x: screenWidth - 117 ,
        y: 510 + 50,
        width: wallWidth,
        height: 65,
        rotation: -40,
        color: wallColor,
      },
      {
        x: 82,
        y: 510 + 110,
        width: wallWidth,
        height: 100,
        rotation: 40,
        color: wallColor,
      },
      {
        x: screenWidth - 92,
        y: 510 + 110,
        width: wallWidth,
        height: 100,
        rotation: -40,
        color: wallColor,
      }
      
     
    ],
    bumpers: [],
  };
  return JSONMap;
}
