export enum PlinkoRows {
  EIGHT = 8,
  NINE = 9,
  TEN = 10,
  ELEVEN = 11,
  TWELVE = 12,
  THIRTEEN = 13,
  FOURTEEN = 14,
  FIFTEEN = 15,
  SIXTEEN = 16,
}
export type PlinkoRowsTypes = "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16";

export type PlinkoMultiplierAnimations = {
  [key in number]: { x: number; y: number }[][];
};

export type PlinkoRowAnimations = { [key in string]: PlinkoMultiplierAnimations };

export interface PlinkoPositionCharacteristics {
  startPosition: number;
  numberOfFrames?: number;
  multiplierIndex: number;
  rowsCount: PlinkoRows;
  frames?: Position[];
}

export const plinkoRowsList: PlinkoRowsTypes[] = [
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
];

export enum PlinkoRiskType {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  EXTREME = "EXTREME",
}

export type PlinkoRiskTypes = "LOW" | "MEDIUM" | "HIGH" | "EXTREME";

export const plinkoRiskList: PlinkoRiskTypes[] = [
  PlinkoRiskType.LOW,
  PlinkoRiskType.MEDIUM,
  PlinkoRiskType.HIGH,
  PlinkoRiskType.EXTREME,
];

export enum Frequency {
  NEVER = 0,
  HARDLYEVER = 1,
  SELDOM = 2,
  RARELY = 3,
  OCCASIONALLY = 4,
  SOMETIMES = 5,
  OFTEN = 6,
  FREQUENTLY = 7,
  USUALLY = 8,
}

export type PlinkoRowsKeys = { [n in string]: number[][] };
export type PlikoBallStartPositions = {
  [n in PlinkoRows]: number[][];
};

export interface PlinkoDropBallData {
  directions: number[];
  multiplierIndex: number;
  risk: PlinkoRiskType;
  rows: PlinkoRows;
  wonMultiplier: number;
}

export interface PlinkoDropBallWager {
  data: PlinkoDropBallData;
  state?: any;
  win: number;
}

export interface PlinkoDropBallCommand {
  bet: number;
  rowsCount: PlinkoRows;
  risk: PlinkoRiskType;
}

export interface Position {
  x: number;
  y: number;
}

export interface PlinkoAudioSource {
  buffer: AudioBuffer | null;
  gainNode: GainNode;
}

export interface PlinkoBetInfo {
  frequency: Frequency;
  payout: number;
  multiplier: number;
  bet: number;
  roundId: string;

  rowsCount: PlinkoRows;
  risk: PlinkoRiskType;
}

export interface PlinkoRateLimit {
  manualMs: number;
  autoMs: number;
}

export interface PlinkoConfig extends PlinkoRateLimit {
  minBet: number;
  maxBet: number;
}

export interface PlinkoCanvasSizes {
  height: number;
  width: number;
}

export type SideBarTabs = "Manual" | "Auto";

export enum SideBarTab {
  MANUAL = "Manual",
  AUTO = "Auto",
}

export interface PlinkoImages {
  sparksImage: HTMLImageElement;
  ballImage: HTMLImageElement;
  collidingPegImage: HTMLImageElement;
}
