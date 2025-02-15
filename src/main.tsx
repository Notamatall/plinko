import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Plinko from "./components/game/index.tsx";
import SlotifyProvider from "./providers/slotifyProvider.tsx";
import ResourcesProvider from "./providers/resourcesProvider.tsx";
import PlinkoAudioProvider from "./providers/plinkoAudioProvider.tsx";
import PlinkoProvider from "./providers/plinkoProvider.tsx";
import "styles/index.ts";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ResourcesProvider>
        <PlinkoAudioProvider>
          <SlotifyProvider>
            <PlinkoProvider>
              <Plinko />
            </PlinkoProvider>
          </SlotifyProvider>
        </PlinkoAudioProvider>
      </ResourcesProvider>
      ,
    </StrictMode>,
  );
} else {
  console.error("Failed to find the root element.");
}
