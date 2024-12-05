/**
 * Main entry point for mars rover.
 * Processes pre defined input string containing grid dimensions and robot commands,
 * console logs final positions of all robots with their lost status.
 *
 */

import { calculateState } from "./utils/calculateState";
import { parseInput } from "./utils/parseInput";
import { Grid, State, Robot } from "./shared.types";

const inputArray = [
  `4 8 
(2, 3, E) LFRFF 
(0, 2, N) FFLFRFF`,
  `4 8 
(2, 3, N) FLLFR 
(1, 0, S) FFRLF`,
];

const output = inputArray.map((input) => processAllRobots(input)).join("\n");
console.log(output);

export function processAllRobots(input: string): string {
  const { grid, robots } = parseInput(input);
  const results = robots.map((robot: Robot) => processRobot(robot, grid));
  return results.join("\n");
}

function processRobot(robot: Robot, grid: Grid): string {
  const { initialState, commands } = robot;
  const { finalState, lost } = calculateState(initialState, commands, grid);
  return formatResult(finalState, lost);
}

function formatResult(State: State, lost: boolean): string {
  return `(${State.x}, ${State.y}, ${State.orientation})${lost ? " LOST" : ""}`;
}
