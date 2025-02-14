import React from "react";

interface IPlinkoAudioContext {
  playDropSound: () => void;
  playMultiplierSound: () => void;
  playClickSound: () => void;
  soundController: {
    toggle: () => void;
    mute: () => void;
    unmute: () => void;
  };
}

const defaultValue: IPlinkoAudioContext = {
  playDropSound: () => {},
  playMultiplierSound: () => {},
  playClickSound: () => {},
  soundController: {
    toggle: () => {},
    mute: () => {},
    unmute: () => {},
  },
};

const PlinkoAudioContext = React.createContext<IPlinkoAudioContext>(defaultValue);

export default PlinkoAudioContext;
