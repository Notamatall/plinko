import React, { PropsWithChildren, useMemo, useRef, useState } from "react";

import SlotifyContext from "../contexts/slotifyContext";
import { useResourcesContext } from "hooks/useResourcesContext";
import Loader from "src/components/loader";
import { LOADER_MAX_PERCENT } from "types/constants";

const SlotifyProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [canSeeContent, setCanSeeContent] = useState(false);
  const { isLoadingResources } = useResourcesContext();
  const loaderDelayTimeout = useRef<any | null>(null);

  const loaderValues = useMemo(() => {
    return [!isLoadingResources];
  }, [isLoadingResources]);

  if (isLoadingResources || !canSeeContent) {
    const finishedProcressesCount = loaderValues.reduce<number>((sum, value) => {
      sum += +value;
      return sum;
    }, 0);
    const progressPercent = finishedProcressesCount * (LOADER_MAX_PERCENT / loaderValues.length);

    if (progressPercent === LOADER_MAX_PERCENT && loaderDelayTimeout.current === null) {
      loaderDelayTimeout.current = setTimeout(() => {
        setCanSeeContent(true);
      }, 1500);
    }

    return <Loader progressValue={progressPercent} />;
  }

  return <SlotifyContext.Provider value={{}}>{children}</SlotifyContext.Provider>;
};

export default SlotifyProvider;
