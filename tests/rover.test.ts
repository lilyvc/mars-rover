import { describe, expect, test } from "@jest/globals";
import {
  calculatePosition,
  isLost,
  moveForward,
  turn,
} from "../src/utils/calculatePosition";
import { parseInput } from "../src/utils/parseInput";
import { processAllRobots } from "../src/index";
import { Grid, Orientation, Position } from "../src/shared.types";

describe("calculatePosition", () => {
  const grid: Grid = { width: 4, height: 8 };

  it("should process commands without getting lost", () => {
    const initialPosition: Position = { x: 2, y: 3, orientation: "E" };
    const commands = "LF";
    const expected = {
      finalPosition: { x: 2, y: 4, orientation: "N" },
      lost: false,
    };
    expect(calculatePosition(initialPosition, commands, grid)).toEqual(
      expected
    );
  });

  it("should handle robot getting lost", () => {
    const initialPosition: Position = { x: 4, y: 8, orientation: "N" };
    const commands = "F";
    const result = calculatePosition(initialPosition, commands, grid);
    expect(result.lost).toBe(true);
  });
});

describe("turn", () => {
  it("should turn left correctly", () => {
    expect(turn("N", "L")).toBe("W");
    expect(turn("W", "L")).toBe("S");
    expect(turn("S", "L")).toBe("E");
    expect(turn("E", "L")).toBe("N");
  });

  it("should turn right correctly", () => {
    expect(turn("N", "R")).toBe("E");
    expect(turn("E", "R")).toBe("S");
    expect(turn("S", "R")).toBe("W");
    expect(turn("W", "R")).toBe("N");
  });

  it("should return to starting orientation after 4 turns in same direction", () => {
    let orientation: Orientation = "N";

    orientation = turn(orientation, "R");
    orientation = turn(orientation, "R");
    orientation = turn(orientation, "R");
    orientation = turn(orientation, "R");
    expect(orientation).toBe("N");

    orientation = turn(orientation, "R");
    expect(orientation).toBe("E");
  });
});

describe("moveForward", () => {
  it("should calculate new position based on orientation", () => {
    const position: Position = { x: 2, y: 3, orientation: "N" };
    expect(moveForward(position)).toEqual([2, 4]);

    position.orientation = "E";
    expect(moveForward(position)).toEqual([3, 3]);

    position.orientation = "S";
    expect(moveForward(position)).toEqual([2, 2]);

    position.orientation = "W";
    expect(moveForward(position)).toEqual([1, 3]);
  });
});

describe("isLost", () => {
  const grid: Grid = { width: 4, height: 8 };

  it("should detect when robot is lost", () => {
    expect(isLost(-1, 0, grid)).toBe(true);
    expect(isLost(0, -1, grid)).toBe(true);
    expect(isLost(5, 0, grid)).toBe(true);
    expect(isLost(0, 9, grid)).toBe(true);
  });

  it("should detect when robot is within bounds", () => {
    expect(isLost(0, 0, grid)).toBe(false);
    expect(isLost(4, 8, grid)).toBe(false);
    expect(isLost(2, 4, grid)).toBe(false);
  });
});

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
  test("Two rovers with one getting lost", () => {
    const input = `4 8
(2, 3, E) LFRFF
(0, 2, N) FFLFRFF`;

    const expected = `(4, 4, E)
(0, 4, W) LOST`;

    const result = processAllRobots(input);
    expect(result).toBe(expected);
  });

  test("Two rovers with one getting lost", () => {
    const input = `4 8
(2, 3, N) FLLFR
(1, 0, S) FFRLF`;

    const expected = `(2, 3, W)
(1, 0, S) LOST`;

    const result = processAllRobots(input);
    expect(result).toBe(expected);
  });

  test("Four rovers with two getting lost", () => {
    const input = `4 8
(2, 3, N) FLLFR
(1, 0, S) FFRLF
(2, 3, E) LFRFF
(0, 2, N) FFLFRFF`;

    const expected = `(2, 3, W)
(1, 0, S) LOST
(4, 4, E)
(0, 4, W) LOST`;

    const result = processAllRobots(input);
    expect(result).toBe(expected);
  });
});
