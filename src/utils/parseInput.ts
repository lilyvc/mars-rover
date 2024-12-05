import { Position, Grid, Robot } from "../shared.types";

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
  const [initialPositionString, commands] = robotString.split(") ");
  const initialPosition = parsePosition(initialPositionString);
  return { initialPosition, commands };
};

export const parsePosition = (positionPart: string): Position => {
  const [x, y, orientation] = positionPart.replace(/[()]/g, "").split(" ");
  return {
    x: parseInt(x),
    y: parseInt(y),
    orientation: orientation as "N" | "E" | "S" | "W",
  };
};
