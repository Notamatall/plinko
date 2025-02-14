import { PlinkoRows, Position } from ".";

export type PlinkoMultiplierAnimations = {
  [key in number]: { x: number; y: number }[][];
};

export type PlinkoRowAnimations = {
  [key in string]: PlinkoMultiplierAnimations;
};

export type PlinkoCharacteristics = {
  [key in number]: PlinkoPositionCharacteristics;
};

export interface PlinkoPositionCharacteristics {
  startPosition: number;
  numberOfFrames?: number;
  multiplierIndex: number;
  rowsCount: PlinkoRows;
  frames?: Position[];
}
