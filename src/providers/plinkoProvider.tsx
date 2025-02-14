import React, { PropsWithChildren, useCallback, useMemo, useRef, useState } from "react";

import PlinkoEngine from "types/plinko/plinko";
import { PlinkoRiskType, PlinkoRows } from "types/plinko";
import { BetModification, GenericState } from "types/index";
import PlinkoContext from "src/contexts/plinkoContext";
import {
  DEFAULT_RISK,
  DEFAULT_ROWS_COUNT,
  DEFAULT_ACTIVE_BALLS_COUNT,
} from "types/plinko/constants";
import useNumberFunctions from "hooks/useNumberFunctions";
import { gameInfo } from "src/constants/game-info";

const PlinkoProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [risk, setRisk] = useState<PlinkoRiskType>(DEFAULT_RISK);
  const [rowsCount, setRowsCount] = useState<PlinkoRows>(DEFAULT_ROWS_COUNT);
  const [activeBallsCount, setActiveBallsCount] = useState<number>(DEFAULT_ACTIVE_BALLS_COUNT);
  const [animationsQueue, setAnimationQueue] = useState<number[]>([]);
  const [plinkoEngine] = useState<PlinkoEngine>(new PlinkoEngine(DEFAULT_ROWS_COUNT));
  const [betValue, setBet] = useState<number>(gameInfo.minBet);
  const [localBalance, setLocalBalance] = useState<number>(gameInfo.balance);
  const { normalizeBetSize } = useNumberFunctions();
  const localBalanceRef = useRef(gameInfo.balance);

  const addToBalance = useCallback((value: number) => {
    const newValue = localBalanceRef.current + value;
    const flooredValue = Math.floor(newValue);
    localBalanceRef.current = flooredValue;
    setLocalBalance(flooredValue);
  }, []);

  const onRowCountChange = useCallback(
    (value: PlinkoRows) => {
      if (value) {
        plinkoEngine.clearBalls();
        plinkoEngine.setRowsCount(value);
        setRowsCount(value);
      }
    },
    [plinkoEngine],
  );

  const onBet = useCallback(
    async (bet: BetModification) => {
      if (typeof bet === "string") {
        switch (bet) {
          case "1/2":
            return setBet(prev => normalizeBetSize(prev / 2));
          case "x2":
            return setBet(prev => normalizeBetSize(prev * 2));
          case "Max": {
            return setBet(normalizeBetSize(localBalanceRef.current));
          }
        }
      } else {
        setBet(bet);
      }
    },
    [normalizeBetSize],
  );

  const betInfo = useMemo(() => {
    return {
      bet: {
        value: betValue,
        setValue: onBet,
      },
    };
  }, [betValue, onBet]);

  const riskInfo = useMemo(() => {
    return {
      risk: {
        value: risk,
        setValue: setRisk,
      } as GenericState<PlinkoRiskType>,
    };
  }, [risk]);

  const rowsCountInfo = useMemo(() => {
    return {
      rowsCount: {
        value: rowsCount,
        setValue: onRowCountChange,
      },
    };
  }, [onRowCountChange, rowsCount]);

  const activeBallsCountInfo = useMemo(() => {
    return {
      activeBallsCount: {
        value: activeBallsCount,
        setValue: setActiveBallsCount,
      } as GenericState<number>,
    };
  }, [activeBallsCount]);

  const animationsQueueInfo = useMemo(() => {
    return {
      animationsQueue: {
        value: animationsQueue,
        setValue: setAnimationQueue,
      } as GenericState<number[]>,
    };
  }, [animationsQueue]);

  const localBalanceInfo = useMemo(() => {
    return {
      localBalance: {
        ref: localBalanceRef,
        value: localBalance.toFixed(2),
        setValue: setLocalBalance,
        addToBalance,
      },
    };
  }, [localBalance, addToBalance]);

  return (
    <PlinkoContext.Provider
      value={{
        engine: plinkoEngine,
        ...animationsQueueInfo,
        ...activeBallsCountInfo,
        ...betInfo,
        ...riskInfo,
        ...rowsCountInfo,
        ...localBalanceInfo,
      }}
    >
      <>{children}</>
    </PlinkoContext.Provider>
  );
};

export default PlinkoProvider;
