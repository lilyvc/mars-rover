import { State, Grid, Robot } from "../shared.types";

/**
 * Parses raw input string into grid and robots
 * @param input - Multiline string representing grid and robots: `4 8
 *  (2, 3, E) LF
 *  (0, 2, N) RF`
 *
 * @returns { grid: { width, height }, robots: [{ initialState, commands }] }
 *
 */
export const parseInput = (input: string): { grid: Grid; robots: Robot[] } => {
  const lines = input.trim().split("\n");
  const grid = parseGrid(lines[0]);
  const robots = lines.slice(1).map(parseRobot);
  return { grid, robots };
};

export const parseGrid = (gridSize: string): Grid => {
  const [width, height] = gridSize.split(" ").map(Number);
  return { width, height };
};

export const parseRobot = (robotString: string): Robot => {
  const [initialStateString, commands] = robotString.split(") ");
  const initialState = parseState(initialStateString);
  return { initialState, commands };
};

export const parseState = (state: string): State => {
  const [x, y, orientation] = state.replace(/[()]/g, "").split(" ");
  return {
    x: parseInt(x),
    y: parseInt(y),
    orientation: orientation as "N" | "E" | "S" | "W",
  };
};
