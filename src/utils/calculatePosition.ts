import { Grid, Orientation, Position } from "../shared.types";

type Direction = "L" | "R";

export const calculatePosition = (
  initialPosition: Position,
  commands: string,
  grid: Grid
) => {
  let currentPosition = { ...initialPosition };
  let lost = false;

  for (const command of commands) {
    if (lost) break;
    if (command === "L" || command === "R") {
      currentPosition.orientation = turn(currentPosition.orientation, command);
    } else if (command === "F") {
      const [nextX, nextY] = moveForward(currentPosition);
      if (isLost(nextX, nextY, grid)) {
        lost = true;
      } else {
        currentPosition = { ...currentPosition, x: nextX, y: nextY };
      }
    }
  }

  return {
    finalPosition: currentPosition,
    lost,
  };
};

export const turn = (
  currentOrientation: Orientation,
  direction: Direction
): Orientation => {
  const orientations: Orientation[] = ["N", "E", "S", "W"];
  const index = orientations.indexOf(currentOrientation);
  return direction === "L"
    ? orientations[(index + 3) % 4]
    : orientations[(index + 1) % 4];
};

export const moveForward = (currentPosition: Position): [number, number] => {
  const { x, y, orientation } = currentPosition;
  switch (orientation) {
    case "N":
      return [x, y + 1];
    case "E":
      return [x + 1, y];
    case "S":
      return [x, y - 1];
    case "W":
      return [x - 1, y];
    default:
      throw new Error(`Invalid orientation: ${orientation}`);
  }
};

export const isLost = (x: number, y: number, grid: Grid): boolean => {
  return x < 0 || y < 0 || x > grid.width || y > grid.height;
};
