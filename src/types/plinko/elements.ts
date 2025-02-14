import styled, { css } from "styled-components";
import { Frequency } from ".";

const neverStyles = css`
  background: #e60207;
`;

const hardlyEverStyles = css`
  background: #ff070b;
`;

const seldomStyles = css`
  background: #ff3437;
`;

const rarelyStyles = css`
  background: #f64300;
`;

const occasionallyStyles = css`
  background: #f75325;
`;

const sometimesStyles = css`
  background: #ff7423;
`;

const oftenStyles = css`
  background: #ff9110;
`;

const frequentlyStyles = css`
  background: #fbbc00;
`;

const usuallyStyles = css`
  background: #ffd700;
`;

const getFrequecny = (frequency: Frequency) => {
  switch (frequency) {
    case Frequency.NEVER:
      return neverStyles;
    case Frequency.HARDLYEVER:
      return hardlyEverStyles;
    case Frequency.SELDOM:
      return seldomStyles;
    case Frequency.RARELY:
      return rarelyStyles;
    case Frequency.OCCASIONALLY:
      return occasionallyStyles;
    case Frequency.SOMETIMES:
      return sometimesStyles;
    case Frequency.OFTEN:
      return oftenStyles;
    case Frequency.FREQUENTLY:
      return frequentlyStyles;
    case Frequency.USUALLY:
      return usuallyStyles;
  }
};
const PlinkoResultMultiplier = styled.button<{ $frequency: Frequency }>`
  border: 0;
  border-radius: 0.375rem;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.6875rem;
  width: 3.125rem;
  font-weight: 600;
  font-size: 0.75rem;
  position: relative;
  font-family: var(--primary-font);
  color: #1d2234;
  ${({ $frequency }) => getFrequecny($frequency)}

  @media (max-width: 550px) {
    width: 2.125rem;
  }
`;

const PlinkoMultiplier = styled.div<{
  $frequency: Frequency;
  $isanimationactive: string;
}>`
  font-family: var(--primary-font);
  flex: 1;
  justify-content: center;
  align-items: center;
  display: flex;
  height: 2.2rem;
  border-radius: 0.375rem;
  font-size: 10px;
  padding-top: 1.5px;
  color: var(--night);
  font-weight: 500;
  position: relative;

  ${({ $frequency }) => getFrequecny($frequency)}
  ${({ $isanimationactive, $frequency }) =>
    $isanimationactive === "true"
      ? `
          animation: reached_${$frequency} 0.2s 1;
        `
      : null}
    ${({ $frequency }) => {
    const animationShadow =
      $frequency === Frequency.NEVER
        ? "box-shadow: 0px -10px 20px 6px #e60207;"
        : $frequency === Frequency.HARDLYEVER
          ? "box-shadow: 0px -10px 20px 6px #ff070b;"
          : $frequency === Frequency.SELDOM
            ? "box-shadow: 0px -10px 20px 6px #ff3437;"
            : $frequency === Frequency.RARELY
              ? "box-shadow: 0px -10px 20px 6px #f64300;"
              : $frequency === Frequency.OCCASIONALLY
                ? "box-shadow: 0px -10px 20px 6px #f75325;"
                : $frequency === Frequency.SOMETIMES
                  ? "box-shadow: 0px -10px 20px 6px #ff7423;"
                  : $frequency === Frequency.OFTEN
                    ? "box-shadow: 0px -10px 20px 6px #ff9110;"
                    : $frequency === Frequency.FREQUENTLY
                      ? "box-shadow: 0px -10px 20px 6px #fbbc00;"
                      : $frequency === Frequency.USUALLY
                        ? "box-shadow: 0px -10px 20px 6px #ffd700;"
                        : null;

    return `  
    @keyframes reached_${$frequency} {
  50% {
      transform: translateY(7px);
      ${animationShadow}
      }
    }
  100% {
    transform: translateY(0px);
  }`;
  }};
  &[data-adaptive="false"] {
    color: #0e1113;
    font-family: var(--primary-font);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  &[data-adaptive="true"] {
    @media (max-width: 1200px) {
      font-size: 10px;
      height: 2rem;
      & span:nth-child(2) {
        font-size: 8px;
      }
    }

    @media (max-width: 1024px) {
      font-size: 10px;
      height: 1.8rem;
      & span:nth-child(2) {
        font-size: 7px;
      }
    }

    @media (max-width: 800px) {
      font-size: 10px;
      height: 1.5rem;
      & span:nth-child(2) {
        font-size: 6px;
      }
    }

    @media (max-width: 550px) {
      font-size: 6px;
      height: 1.3rem;
      & span:nth-child(2) {
        font-size: 4px;
      }
    }
  }
`;

const PlinkoMultipliersContainer = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
  @media (max-width: 1024px) {
    gap: 3px;
  }
  @media (max-width: 550px) {
    gap: 2px;
  }
`;

const PlinkoCanvasContainer = styled.div`
  width: 100%;
  max-width: 750px;
  & canvas {
    width: 100%;
    height: 100%;
  }
`;

const PlinkoGameResults = styled.div`
  display: flex;
  margin-left: auto;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.25rem;
  overflow: hidden;
  flex-direction: column;
  width: -webkit-max-content;
  width: max-content;
  height: 12.5rem;
  position: absolute;
  top: 15px;
  right: 15px;
  & button {
    transition: all 0.1s;
  }
  & button:first-child {
    animation: slideIn 0.25s ease-in;
    @keyframes slideIn {
      0% {
        transform: translateY(-1.875rem);
      }
      100% {
        transform: translateY(0);
      }
    }
  }
  & button:nth-of-type(6) {
    opacity: 0;
    animation: fadeOut 0.5s ease-out;
    @keyframes fadeOut {
      0% {
        opacity: 1;
      }

      100% {
        opacity: 0;
      }
    }
  }
`;

const PlinkoAbsoluteWrapper = styled.div`
  position: absolute;
  left: 16px;
  top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  z-index: 2;
`;
export {
  PlinkoAbsoluteWrapper,
  PlinkoResultMultiplier,
  PlinkoMultipliersContainer,
  PlinkoMultiplier,
  PlinkoCanvasContainer,
  PlinkoGameResults,
};
