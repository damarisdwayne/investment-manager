import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { NewContribuitionTable } from "./components/new-contribuition-table";
import { InputLabelGroup } from "@/components/forms/input-label-group";
import { Button } from "@/components/ui/button";
import { formatNumberToCurrency, parseCurrencyToNumber } from "@/utils";
import { AssetInfoData, IAsset } from "@/types/asset";
import {
  getAssetInfoFromBrapi,
  getAssets,
  getPriceDollar,
} from "@/services/asset";
import { Goal, GoalSingleValues, getGoal } from "@/services/goals";

interface AssetInfo {
  assetGroup: string;
  price: number;
  ticker: string;
  qtd: number;
  operation: string;
  exchangeName: string;
  rate: number;
  recommendedPercentage: number;
  currentPercentage: number;
  suggestedValueForAsset: number;
  total: number;
}

export interface AssetCategory {
  category: string;
  assets: AssetInfo[];
}

export const NewContribuition: React.FC = () => {
  const [assets, setAssets] = useState<IAsset[]>([]);
  const [assetInfoList, setAssetInfoList] = useState<AssetInfoData[]>([]);
  const [goal, setGoal] = useState<Goal>();
  const [contribuitionAmount, setContribuitionAmount] = useState<string>();
  const [assetAllocations, setAssetAllocations] =
    useState<Record<string, number>[]>();
  const [showShowContribuitionColumn, setShowShowContribuitionColumn] =
    useState(false);
  const [dollarPrice, setDollarPrice] = useState(0);

  const getAllAssets = async () => {
    const data = await getAssets();
    setAssets(data as any as IAsset[]);
  };

  const getCurrentGoal = async () => {
    const goal = await getGoal();
    setGoal(goal!);
  };

  const getAllAssetInfo = async () => {
    const assetPromises = assets
      .filter((asset) => asset.assetGroup !== "fixedIncome")
      .map((asset) => getAssetInfoFromBrapi(asset.ticker));

    const assetData = await Promise.all(assetPromises);
    const flatAssetData = assetData.flat();
    setAssetInfoList(flatAssetData);
  };

  const assetGroupPercentages: GoalSingleValues = {
    stock: goal?.stock[0] || 0,
    stockUsa: goal?.stockUsa[0] || 0,
    fii: goal?.fii[0] || 0,
    reits: goal?.reits[0] || 0,
    fixedIncome: goal?.fixedIncome[0] || 0,
    cryptocurrency: goal?.cryptocurrency[0] || 0,
    gold: goal?.gold[0] || 0,
  };

  const getSumTotalAssets = () => {
    let total = 0;

    assets.forEach((asset) => {
      total += asset.total || 0;
    });

    return total;
  };

  const sumTotalAssets = getSumTotalAssets();

  const sumTotalAssetInfo = (assets: IAsset[]): number => {
    return assets.reduce((sum, asset) => sum + +asset.rate!, 0);
  };

  // Função para calcular a porcentagem atual do ativo com base no valor sugerido
  const calculateCurrentPercentage = (
    total: number,
    suggestedValueForAsset: number,
  ): number => {
    return total / suggestedValueForAsset;
  };

  // Função para calcular o valor sugerido para o ativo
  const calculateSuggestedValueForAsset = (
    rate: number,
    maxRate: number,
    assetGroupDistribuition: number,
  ): number => {
    return (rate / maxRate) * assetGroupDistribuition;
  };

  const calculateGoalAllocation = (amount: number) => {
    const totalAllocation = Object.values(assetGroupPercentages).reduce(
      (acc, currentValue) => acc + currentValue,
      0,
    );

    if (totalAllocation === 0) {
      return assetGroupPercentages;
    }

    const allocatedAmounts: GoalSingleValues = {} as GoalSingleValues;
    for (const key in assetGroupPercentages) {
      if (Object.prototype.hasOwnProperty.call(assetGroupPercentages, key)) {
        const percentage =
          assetGroupPercentages[key as keyof GoalSingleValues] /
          totalAllocation;
        allocatedAmounts[key as keyof GoalSingleValues] = percentage * amount;
      }
    }

    return allocatedAmounts;
  };

  const calculateTotalInvested = () => {
    return assets.reduce((sum, asset) => sum + asset.total, 0);
  };

  const calculateTotalInvestedByAssetGroup = (): Record<string, number> => {
    const investmentByAssetGroup: Record<string, number> = {};

    assets.forEach((asset) => {
      const assetGroup = asset.assetGroup!;
      if (investmentByAssetGroup[assetGroup]) {
        investmentByAssetGroup[assetGroup] += asset.total;
      } else {
        investmentByAssetGroup[assetGroup] = asset.total;
      }
    });

    return investmentByAssetGroup;
  };

  const getMaxRate = () => {
    const assetGroups = {
      stock: ["stock", "bdr", "etf"],
      fii: ["fii", "fiiAgro"],
      fixedIncome: ["fixedIncome", "treasury"],
      usa: ["etfUsa", "stockUsa"],
      reit: ["reit"],
      cryptocurrency: ["cryptocurrency"],
      gold: ["gold"],
    };

    const rateTotals: Record<string, number> = {};
    Object.entries(assetGroups).forEach(([groupName, groupCategories]) => {
      const groupAssets = assets.filter((asset) =>
        groupCategories.includes(asset.assetGroup!),
      );
      rateTotals[groupName] = sumTotalAssetInfo(groupAssets);
    });

    const {
      stock: rateStockTotal,
      fii: rateFiiTotal,
      fixedIncome: rateFixedIncomeTotal,
      usa: rateUsaTotal,
      reit: rateReitTotal,
      cryptocurrency: rateCryptocurrencyTotal,
      gold: rateGoldTotal,
    } = rateTotals;

    const maxRates: Record<string, number> = {
      stock: rateStockTotal,
      fii: rateFiiTotal,
      fiiAgro: rateFiiTotal,
      fixedIncome: rateFixedIncomeTotal,
      treasury: rateFixedIncomeTotal,
      etfUsa: rateUsaTotal,
      stockUsa: rateUsaTotal,
      reit: rateReitTotal,
      cryptocurrency: rateCryptocurrencyTotal,
      gold: rateGoldTotal,
    };

    return maxRates;
  };

  const categorizedAssets: AssetCategory[] = assets.reduce(
    (
      acc: AssetCategory[],
      { assetGroup, operation, exchangeName, ticker, rate, total, qtd },
    ) => {
      const maxRate = getMaxRate()[assetGroup!] || 0;

      const assetInfo = assetInfoList.filter((assetInfo) =>
        assetInfo.symbol.toLowerCase().includes(ticker.toLowerCase()),
      );
      const currentPrice = assetInfo?.[0]?.regularMarketPrice;
      const finalAssetPrice =
        assetGroup === "stockUsa" ? currentPrice * dollarPrice : currentPrice;

      const totalInvestedInAsset =
        assetGroup === "fixedIncome" ? total : finalAssetPrice * qtd!;

      const assetGroupDistribuition =
        (assetGroupPercentages[assetGroup as keyof GoalSingleValues] / 100) *
        sumTotalAssets;

      const suggestedValueForAsset = calculateSuggestedValueForAsset(
        +rate!,
        maxRate,
        assetGroupDistribuition,
      );

      const existingCategory = acc.find(
        (category) => category.category === assetGroup,
      );

      const asset: AssetInfo = {
        assetGroup: assetGroup || "",
        qtd: qtd || 0,
        price: finalAssetPrice || 0,
        operation,
        exchangeName,
        ticker,
        rate: +rate!,
        recommendedPercentage: +rate! / maxRate,
        currentPercentage: calculateCurrentPercentage(
          totalInvestedInAsset,
          suggestedValueForAsset,
        ),
        suggestedValueForAsset,
        total: totalInvestedInAsset,
      };

      if (existingCategory) {
        existingCategory.assets.push(asset);
      } else {
        acc.push({
          category: assetGroup || "",
          assets: [asset],
        });
      }

      return acc;
    },
    [],
  );

  const calculateAssetAllocation = (
    assetCategory: AssetCategory,
    groupAllocationPercentage: Record<string, number>,
  ): Record<string, number> => {
    const allocatedAmounts: Record<string, number> = {};
    const allocatedAmountsTest: Record<string, Record<string, number>> = {};

    const availableAmount = parseCurrencyToNumber(contribuitionAmount!);
    const totalInvested = calculateTotalInvested();

    const totalInvestment = totalInvested + availableAmount;
    const idealGroupValues = calculateGoalAllocation(totalInvestment);
    const totalInvestedByAssetGroup = calculateTotalInvestedByAssetGroup();

    assetCategory.assets.forEach((asset) => {
      const assetGroup = asset.assetGroup;
      const recommendedValueForGroup =
        idealGroupValues[assetGroup as keyof GoalSingleValues];
      const recommendedValueForAsset =
        asset.recommendedPercentage * recommendedValueForGroup;

      const groupAllocationPercentageValue = groupAllocationPercentage;
      const totalInvestedAndAllocatedForAssetGroup =
        groupAllocationPercentageValue[assetGroup] +
        totalInvestedByAssetGroup[assetGroup as keyof GoalSingleValues];

      const remainingAmountTotal =
        recommendedValueForGroup > totalInvestedAndAllocatedForAssetGroup
          ? groupAllocationPercentageValue[assetGroup]
          : 0;

      const remainingAllocationForAsset =
        remainingAmountTotal > 0
          ? asset.recommendedPercentage * remainingAmountTotal
          : 0;

      const totalValueForAsset =
        recommendedValueForAsset > asset.total
          ? remainingAllocationForAsset
          : 0;

      const allocation = Math.min(
        totalValueForAsset,
        recommendedValueForAsset - asset.total,
      );

      allocatedAmounts[asset.ticker] = allocation > 0 ? allocation : 0;

      if (allocatedAmountsTest[assetGroup] === undefined) {
        allocatedAmountsTest[assetGroup] = {};
      }

      allocatedAmountsTest[assetGroup][asset.ticker] =
        allocation > 0 ? allocation : 0;
    });

    return allocatedAmounts;
  };

  const handleCalculate = () => {
    if (!contribuitionAmount) {
      return;
    }
    const availableAmount = parseCurrencyToNumber(contribuitionAmount!);
    const totalInvested = calculateTotalInvested();
    const totalInvestment = totalInvested + availableAmount;
    const idealInvestmentByAssetGroup =
      calculateGoalAllocation(totalInvestment);
    const totalInvestedByAssetGroup = calculateTotalInvestedByAssetGroup();

    const allowedAllocationPercentage: Record<string, number> = {};

    Object.keys(idealInvestmentByAssetGroup).forEach((assetGroup) => {
      const idealValue =
        idealInvestmentByAssetGroup[assetGroup as keyof GoalSingleValues] || 0;
      const investedValue = totalInvestedByAssetGroup[assetGroup] || 0;
      const difference = Math.max(idealValue - investedValue, 0);

      if (difference > 0) {
        allowedAllocationPercentage[assetGroup] =
          assetGroupPercentages[assetGroup as keyof GoalSingleValues];
      }
    });

    const sumGroupAllocationPercentage = Object.values(
      allowedAllocationPercentage,
    ).reduce((acc, value) => acc + value, 0);

    const remainingTotaPercentage = 100 - sumGroupAllocationPercentage;

    const newGroupAllocationPercentage: Record<string, number> = {};

    if (remainingTotaPercentage > 0) {
      Object.keys(allowedAllocationPercentage).forEach((assetGroup) => {
        const newPercentage =
          (allowedAllocationPercentage[assetGroup] * 100) /
          sumGroupAllocationPercentage;

        newGroupAllocationPercentage[assetGroup] = newPercentage;
      });
    }

    const groupAllocationPercentage: Record<string, number> = {};
    Object.keys(newGroupAllocationPercentage).forEach((assetGroup) => {
      const groupAllocationValue =
        (newGroupAllocationPercentage[assetGroup] / 100) * availableAmount;

      groupAllocationPercentage[assetGroup] = groupAllocationValue;
    });

    const assetAllocations: Record<string, number>[] = [];
    categorizedAssets.forEach((category) => {
      const assetAllocationForCategory = calculateAssetAllocation(
        category,
        groupAllocationPercentage,
      );
      assetAllocations.push(assetAllocationForCategory);
    });

    setShowShowContribuitionColumn(true);
    setAssetAllocations(assetAllocations);

    return assetAllocations;
  };

  const getCurrentPriceDollar = async () => {
    const price = await getPriceDollar();
    setDollarPrice(price["BRL"]);
  };

  useEffect(() => {
    getCurrentPriceDollar();
  }, []);

  useEffect(() => {
    getAllAssets();
    getCurrentGoal();
  }, []);

  useEffect(() => {
    getAllAssetInfo();
  }, [assets]);

  return (
    <div className="mt-8 flex-1 m-auto px-8">
      <div className="my-4 flex flex-row justify-between align-bottom">
        <div className="flex flex-col">
          <h1 className="mb-2">Novo aporte</h1>
          <p>Quanto você vai investir? Coloque aqui o seu aporte deste mês.</p>
        </div>
        <div className="flex flex-row items-end gap-2">
          <InputLabelGroup label="Valor do investimento">
            <Input
              id="contribuition"
              className="w-[200px]"
              type="text"
              placeholder="Digite o valor de aporte"
              value={contribuitionAmount}
              min={0}
              onChange={(e) =>
                setContribuitionAmount(formatNumberToCurrency(e.target.value))
              }
            />
          </InputLabelGroup>
          <Button type="button" onClick={() => handleCalculate()}>
            Calcular
          </Button>
        </div>
      </div>
      <NewContribuitionTable
        categorizedAssets={categorizedAssets}
        assetAllocations={assetAllocations!}
        showShowContribuitionColumn={showShowContribuitionColumn}
      />
    </div>
  );
};
