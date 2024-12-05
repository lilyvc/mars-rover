import { Grid, Orientation, Position } from "../shared.types";

export const calculatePosition = (
  initialPosition: Position,
  commands: string,
  grid: Grid
) => {
  let currentPosition = initialPosition;
  let lost = false;
  let lastValidPosition = initialPosition;

  for (const command of commands) {
    switch (command) {
      case "L":
      case "R":
        currentPosition.orientation = turn(
          currentPosition.orientation,
          command
        );
        lastValidPosition = currentPosition;
        break;
      case "F":
        const [newX, newY] = moveForward(currentPosition);
        const nextPosition = {
          ...currentPosition,
          x: newX,
          y: newY,
        };

        if (isLost(nextPosition.x, nextPosition.y, grid)) {
          lost = true;
          break;
        }

        currentPosition = nextPosition;
        lastValidPosition = currentPosition;
        break;
    }

    if (lost) break;
  }

  return {
    finalPosition: lastValidPosition,
    lost: lost,
  };
};

const turn = (
  currentOrientation: Orientation,
  direction: "L" | "R"
): Orientation => {
  const orientations: Orientation[] = ["N", "E", "S", "W"];
  const index = orientations.indexOf(currentOrientation);
  return direction === "L"
    ? orientations[(index + 3) % 4]
    : orientations[(index + 1) % 4];
};

const moveForward = (currentPosition: Position): [number, number] => {
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

const isLost = (x: number, y: number, grid: Grid): boolean => {
  return x < 0 || y < 0 || x > grid.width || y > grid.height;
};
