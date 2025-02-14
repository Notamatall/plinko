import React from "react";
import { AssetType } from "types/index";
import { PlinkoImages, PlinkoRowAnimations } from "types/plinko";

interface IResourcesContext {
  animations: PlinkoRowAnimations;
  plinkoImages: PlinkoImages;
  isLoadingResources: boolean;
}

const defaultValue: IResourcesContext = {
  animations: {},
  plinkoImages: {
    sparksImage: new Image(),
    ballImage: new Image(),
    collidingPegImage: new Image(),
  },
  isLoadingResources: false,
};

const ResourcesContext = React.createContext<IResourcesContext>(defaultValue);

export default ResourcesContext;
