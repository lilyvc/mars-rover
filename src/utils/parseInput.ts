import { Position, Grid } from "../shared.types";

export const parseInput = (input: string) => {
  const lines = input.trim().split("\n");
  const [gridSize, ...robotCommands] = lines;

  const grid: Grid = {
    width: parseInt(gridSize[0]),
    height: parseInt(gridSize[2]),
  };

  const robots = robotCommands.map((robotCommand) => {
    const initialPositionValues = robotCommand
      .replace(/[()]/g, "")
      .split(" ")
      .slice(0, 3);

    const initialPosition: Position = {
      x: parseInt(initialPositionValues[0]),
      y: parseInt(initialPositionValues[1]),
      orientation: initialPositionValues[2] as "N" | "E" | "S" | "W",
    };

    const commands = robotCommand.split(" ")[3];
    return { initialPosition, commands };
  });

  return { grid, robots };
};
