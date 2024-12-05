import { Grid, Orientation, State } from "../shared.types";

type Direction = "L" | "R";

/**
 * Processes a command string to move one robot
 * @param initialState - Starting State {x, y, orientation}
 * @param commands - String of commands (L/R/F)
 * @param grid - Grid dimensions {width, height}
 * @returns Final state and lost status
 */
export const calculateState = (
  initialState: State,
  commands: string,
  grid: Grid
) => {
  let currentState = { ...initialState };
  let lost = false;

  for (const command of commands) {
    if (lost) break;
    if (command === "L" || command === "R") {
      currentState.orientation = turn(currentState.orientation, command);
    } else if (command === "F") {
      const [nextX, nextY] = moveForward(currentState);
      if (isLost(nextX, nextY, grid)) {
        lost = true;
      } else {
        currentState = { ...currentState, x: nextX, y: nextY };
      }
    }
  }

  return {
    finalState: currentState,
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

export const moveForward = (currentState: State): [number, number] => {
  const { x, y, orientation } = currentState;
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
