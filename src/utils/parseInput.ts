import { Position, Grid, Robot } from "../shared.types";

export const parseInput = (input: string): { grid: Grid; robots: Robot[] } => {
  const lines = input.trim().split("\n");
  const grid = parseGrid(lines[0]);
  const robots = lines.slice(1).map(parseRobotCommand);
  return { grid, robots };
};

export const parseGrid = (gridSize: string): Grid => {
  const [width, height] = gridSize.split(" ").map(Number);
  return { width, height };
};

export const parseRobotCommand = (robotCommand: string): Robot => {
  const [positionPart, commands] = robotCommand.split(") ");
  const initialPosition = parsePosition(positionPart);
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
