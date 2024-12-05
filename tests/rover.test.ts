import { describe, expect, test } from "@jest/globals";
import { calculatePosition } from "../src/utils/calculatePosition";
import { parseInput } from "../src/utils/parseInput";
import { processCommands } from "../src/index";

describe("Calculate Position", () => {
  test("moves forward in each direction", () => {
    const grid = { width: 4, height: 8 };

    expect(
      calculatePosition({ x: 2, y: 2, orientation: "N" }, "F", grid)
    ).toEqual({
      finalPosition: { x: 2, y: 3, orientation: "N" },
      lost: false,
    });

    expect(
      calculatePosition({ x: 2, y: 2, orientation: "E" }, "F", grid)
    ).toEqual({
      finalPosition: { x: 3, y: 2, orientation: "E" },
      lost: false,
    });
  });

  test("rotates correctly", () => {
    const grid = { width: 4, height: 8 };

    expect(
      calculatePosition({ x: 2, y: 2, orientation: "N" }, "L", grid)
    ).toEqual({
      finalPosition: { x: 2, y: 2, orientation: "W" },
      lost: false,
    });

    expect(
      calculatePosition({ x: 2, y: 2, orientation: "N" }, "R", grid)
    ).toEqual({
      finalPosition: { x: 2, y: 2, orientation: "E" },
      lost: false,
    });
  });

  test("marks as lost when moving off grid", () => {
    const grid = { width: 4, height: 8 };

    expect(
      calculatePosition({ x: 0, y: 0, orientation: "S" }, "F", grid)
    ).toEqual({
      finalPosition: { x: 0, y: 0, orientation: "S" },
      lost: true,
    });
  });
});

describe("Parse Input", () => {
  test("parses grid and single command correctly", () => {
    const input = `4 8
(2, 3, E) LFRFF`;

    const result = parseInput(input);

    expect(result.grid).toEqual({ width: 4, height: 8 });
    expect(result.robots).toEqual([
      {
        initialPosition: { x: 2, y: 3, orientation: "E" },
        commands: "LFRFF",
      },
    ]);
  });

  test("handles multiple robots", () => {
    const input = `4 8
(2, 3, E) LFRFF
(0, 2, N) FFLFRFF`;

    const { robots } = parseInput(input);
    expect(robots).toHaveLength(2);
  });
});

describe("Complex Movement Scenarios", () => {
  test("Multiple rovers with one reaching edge and getting lost", () => {
    const input = `4 8
(2, 3, E) LFRFF
(0, 2, N) FFLFRFF`;

    const expected = `(4, 4, E)
(0, 4, W) LOST`;

    const result = processCommands(input);
    expect(result).toBe(expected);
  });

  test("Rovers with turning movements and southern boundary loss", () => {
    const input = `4 8
(2, 3, N) FLLFR
(1, 0, S) FFRLF`;

    const expected = `(2, 3, W)
(1, 0, S) LOST`;

    const result = processCommands(input);
    expect(result).toBe(expected);
  });
});
