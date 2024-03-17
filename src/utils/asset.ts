import { AssetGroup } from "@/constants";
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

export const renderTypeAsset = (assetGroup: string) => {
  switch (assetGroup) {
    case AssetGroup.STOCK:
      return "Ações";
    case AssetGroup.STOCK_USA:
      return "Ações EUA";
    case AssetGroup.ETF_USA:
      return "ETF EUA";
    case AssetGroup.BDR:
      return "BDR";
    case AssetGroup.SUBSCRIPTION_RIGHT:
      return "Direito de subscrição";
    case AssetGroup.ETF:
      return "ETF";
    case AssetGroup.FI_AGRO:
      return "FI Agro";
    case AssetGroup.FII:
      return "Fundo Imobiliário";
    case AssetGroup.REIT:
      return "REIT";
    case AssetGroup.TREASURY:
      return "Tesouro Direto";
    case AssetGroup.FIXED_INCOME:
      return "Renda fixa";

    default:
      return "Criptomoeda";
  }
};
