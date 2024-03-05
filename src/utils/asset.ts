import { IAsset } from "@/types/asset";

export const calculateTotalAssetsInGroup = (
  assets: IAsset[],
  assetGroup: string,
): number => {
  const totalAssets = assets
    .filter((asset) => asset.assetGroup === assetGroup)
    .reduce((acc, asset) => acc + +asset.total, 0);

  return totalAssets;
};

export const calculatePercentageOfAsset = (
  assetTotal: number,
  totalGroupAssets: number,
) => {
  const percentage = (assetTotal / totalGroupAssets) * 100;

  return percentage.toFixed(2);
};
