import { calculatePosition } from "./utils/calculatePosition";
import { parseInput } from "./utils/parseInput";
import { Grid, Position, Robot } from "./shared.types";

export const processCommands = (input: string): string => {
  const { grid, robots } = parseInput(input);
  const results = robots.map((robot: Robot) => processRobot(robot, grid));
  return results.join("\n");
};

const processRobot = (robot: Robot, grid: Grid): string => {
  const { initialPosition, commands } = robot;
  const { finalPosition, lost } = calculatePosition(
    initialPosition,
    commands,
    grid
  );
  return formatResult(finalPosition, lost);
};

const formatResult = (position: Position, lost: boolean): string => {
  return `(${position.x}, ${position.y}, ${position.orientation})${
    lost ? " LOST" : ""
  }`;
};

function main() {
  const inputArray = [
    `4 8 
(2, 3, E) LFRFF 
(0, 2, N) FFLFRFF`,
    `4 8 
(2, 3, N) FLLFR 
(1, 0, S) FFRLF`,
    ``,
  ];
  const output = inputArray.map((input) => processCommands(input)).join("\n");
  console.log(output);
}

if (require.main === module) {
  main();
}
