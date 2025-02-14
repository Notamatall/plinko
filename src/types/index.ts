import { Dispatch, SetStateAction } from "react";
import { Frequency, PlinkoRiskType, PlinkoRows } from "./plinko";

export type BetModification = "1/2" | "x2" | "Max" | number;
export interface GenericState<T> {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
}

export type ProvablyFairPanelType = "Seeds" | "Verification";

export enum ProvablyFairPanel {
  SEEDS = "Seeds",
  VERIFICATION = "Verification",
}

export class RoundReplayInfo {
  clientSeed: string = "";
  serverSeed: string = "";
  nonce: number = 0;
  risk: PlinkoRiskType = PlinkoRiskType.LOW;
  rowsCount: PlinkoRows = PlinkoRows.EIGHT;
}

export interface ProveFairnessResult {
  wonMultiplier: number;
  risk: PlinkoRiskType;
  rowsCount: PlinkoRows;
  frequency: Frequency;
  randomizationJson: string;
}

export type AssetType = "images" | "animations" | "audio";
