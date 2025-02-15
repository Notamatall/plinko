import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";
import { PlinkoImages, PlinkoRowAnimations } from "types/plinko";
import ResourcesContext from "src/contexts/resourcesContext";
import { LoadingActions } from "types/constants";
import { getProviderGamePath, loadImageAsync } from "utils/index";

const ResourcesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [animations, setAnimations] = useState<PlinkoRowAnimations>({});
  const [loadingQueue, setLoadingQueue] = useState<LoadingActions[]>([
    LoadingActions.ROW_ANIMATIONS,
    LoadingActions.PEG,
    LoadingActions.BALL,
    LoadingActions.SPARKS,
    LoadingActions.CACHING_IMAGES,
  ]);

  const [sparksImage, setSparksImage] = useState<HTMLImageElement>(new Image());
  const [ballImage, setBallImage] = useState<HTMLImageElement>(new Image());
  const [collidingPegImage, setCollidingPegImage] = useState<HTMLImageElement>(new Image());

  const pushLoadingAction = useCallback((action: LoadingActions) => {
    setLoadingQueue(prev => (prev.includes(action) ? prev : [...prev, action]));
  }, []);

  const popLoadingAction = useCallback((action: LoadingActions) => {
    setLoadingQueue(prev => prev.filter(actionName => actionName === action));
  }, []);

  useEffect(() => {
    async function loadAnimations() {
      try {
        const files = [
          "eight-rows-animation.json",
          "nine-rows-animation.json",
          "ten-rows-animation.json",
          "eleven-rows-animation.json",
          "twelve-rows-animation.json",
          "thirteen-rows-animation.json",
          "fourteen-rows-animation.json",
          "fifteen-rows-animation.json",
          "sixteen-rows-animation.json",
        ].map(fileName => getProviderGamePath("animations", fileName));

        const fetchPromises = files.map(file => fetch(file).then(response => response.json()));
        const animationsJsons = await Promise.all(fetchPromises);
        const animationsParsed = animationsJsons.reduce<PlinkoRowAnimations>(
          (resultJson, currJson) =>
            (resultJson = {
              ...JSON.parse(currJson),
              ...resultJson,
            }),
          {},
        );
        setAnimations(animationsParsed);
      } catch (error) {
        console.error("Error loading animations:", error);
      } finally {
        popLoadingAction(LoadingActions.ROW_ANIMATIONS);
      }
    }

    loadAnimations();
  }, [popLoadingAction, pushLoadingAction]);

  useEffect(() => {
    async function loadImages() {
      try {
        const loadPeg = loadImageAsync(getProviderGamePath("images", "peg.png"));
        const loadBall = loadImageAsync(getProviderGamePath("images", "ball.svg"));
        const loadSparks = loadImageAsync(getProviderGamePath("images", "sparks.svg"));

        const results = await Promise.all([loadPeg, loadBall, loadSparks]);
        setCollidingPegImage(results[0].img);
        setBallImage(results[1].img);
        setSparksImage(results[2].img);
      } catch (error) {
        console.error("Error loading plinko ball/peg/sparks:", error);
      } finally {
        popLoadingAction(LoadingActions.PEG);
        popLoadingAction(LoadingActions.BALL);
        popLoadingAction(LoadingActions.SPARKS);
      }
    }

    loadImages();
  }, [popLoadingAction, pushLoadingAction]);

  useEffect(() => {
    async function loadImages() {
      try {
        await Promise.all([
          loadImageAsync(getProviderGamePath("images", "infinity.svg")),
          loadImageAsync(getProviderGamePath("images", "sound-off.svg")),
          loadImageAsync(getProviderGamePath("images", "sound-on.svg")),
        ]);
      } catch (error) {
        console.error("Error loading CACHING_IMAGES", error);
      } finally {
        popLoadingAction(LoadingActions.CACHING_IMAGES);
      }
    }

    loadImages();
  }, [popLoadingAction, pushLoadingAction]);

  const plinkoImages = useMemo<PlinkoImages>(() => {
    return {
      ballImage: ballImage,
      collidingPegImage: collidingPegImage,
      sparksImage: sparksImage,
    };
  }, [ballImage, collidingPegImage, sparksImage]);

  const isLoadingResources = useMemo(() => {
    return loadingQueue.length !== 0;
  }, [loadingQueue]);

  return (
    <ResourcesContext.Provider
      value={{
        animations,
        plinkoImages,
        isLoadingResources,
      }}
    >
      {children}
    </ResourcesContext.Provider>
  );
};

export default ResourcesProvider;
