import React from "react";
import PlinkoContext from "src/contexts/plinkoContext";

export function usePlinkoContext() {
  const context = React.useContext(PlinkoContext);
  if (context === undefined) {
    throw new Error("usePlinkoContext must be used within a PlinkoContext");
  }
  return context;
}
