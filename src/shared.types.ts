export interface Grid {
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
  orientation: "N" | "E" | "S" | "W";
}

export type Orientation = "N" | "E" | "S" | "W";

export interface Robot {
  initialPosition: Position;
  commands: string;
}
