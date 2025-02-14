import React from "react";
import SlotifyContext from "../contexts/slotifyContext";

function useSlotifyContext() {
  const context = React.useContext(SlotifyContext);
  if (context === undefined) {
    throw new Error("useSlotifyContext must be used within a SlotifyContext");
  }
  return context;
}

export default useSlotifyContext;
