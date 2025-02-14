import React, { Dispatch, MutableRefObject, SetStateAction } from "react";
import { BetModification, GenericState } from "types/index";
import { PlinkoRows, PlinkoRiskType } from "types/plinko";
import {
  DEFAULT_ROWS_COUNT,
  DEFAULT_BET_VALUE,
  DEFAULT_RISK,
  DEFAULT_ACTIVE_BALLS_COUNT,
  DEFAULT_MULTIPLIER_ANIMATIONS_QUEUE,
  DEFAULT_LOCAL_BALANCE,
} from "types/plinko/constants";
import PlinkoEngine from "types/plinko/plinko";

interface IPlinkoContext {
  rowsCount: {
    value: PlinkoRows;
    setValue: (rowsCount: PlinkoRows) => void;
  };
  bet: {
    value: number;
    setValue: (bet: BetModification) => void;
  };
  risk: GenericState<PlinkoRiskType>;
  activeBallsCount: GenericState<number>;
  animationsQueue: GenericState<number[]>;
  engine: PlinkoEngine;
  localBalance: {
    ref: MutableRefObject<number>;
    value: string;
    setValue: Dispatch<SetStateAction<number>>;
    addToBalance: (value: number) => void;
  };
}

const defaultValue: IPlinkoContext = {
  rowsCount: {
    value: DEFAULT_ROWS_COUNT,
    setValue: () => {},
  },
  bet: {
    value: DEFAULT_BET_VALUE,
    setValue: () => {},
  },
  risk: {
    value: DEFAULT_RISK,
    setValue: () => {},
  },
  activeBallsCount: {
    value: DEFAULT_ACTIVE_BALLS_COUNT,
    setValue: () => {},
  },
  animationsQueue: {
    value: DEFAULT_MULTIPLIER_ANIMATIONS_QUEUE,
    setValue: () => {},
  },
  engine: {} as PlinkoEngine,
  localBalance: {
    ref: { current: DEFAULT_LOCAL_BALANCE },
    value: `${DEFAULT_LOCAL_BALANCE}`,
    setValue: () => {},
    addToBalance: (_value: number) => {},
  },
};

const PlinkoContext = React.createContext<IPlinkoContext>(defaultValue);

export default PlinkoContext;
