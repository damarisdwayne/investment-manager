import { PieChart } from "@mui/x-charts/PieChart";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { IAsset } from "@/types/asset";

interface OverViewChartProps {
  label: string;
  assets: IAsset[];
}

export const OverViewChart = ({ label, assets }: OverViewChartProps) => {
  const getAssetGroupPercentage = () => {
    const assetGroups: { [key: string]: number } = {};

    assets.forEach((asset) => {
      if (asset.assetGroup) {
        assetGroups[asset.assetGroup] =
          (assetGroups[asset.assetGroup] || 0) + asset.total;
      }
    });

    const totalAssets = assets.reduce((total, asset) => total + asset.total, 0);

    const percentages: { [key: string]: number } = {};

    for (const groupName in assetGroups) {
      const groupTotal = assetGroups[groupName];
      percentages[groupName] = (groupTotal / totalAssets) * 100;
    }

    return percentages;
  };

  const percentages = getAssetGroupPercentage();

  return (
    <Card className="flex-1 w-full h-full space-y-2 align-middle justify-center flex flex-col">
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-start">
        <PieChart
          slotProps={{
            legend: {
              padding: 0,
              position: { vertical: "middle", horizontal: "right" },
              direction: "column",
              labelStyle: {
                fill: "hsl(var(--foreground))",
              },
            },
          }}
          series={[
            {
              data: [
                {
                  id: 0,
                  value: +percentages["stock"]?.toFixed(2) || 0,
                  label: "Ações Nacionais",
                  color: "#1e40af",
                },
                {
                  id: 1,
                  value: +percentages["stockUsa"]?.toFixed(2) || 0,
                  label: "Ações Internacionais",
                  color: "#0369a1",
                },
                {
                  id: 2,
                  value: +percentages["fii"]?.toFixed(2) || 0,
                  label: "Fundos imobiliários",
                  color: "#0891b2",
                },
                {
                  id: 3,
                  value: +percentages["reits"]?.toFixed(2) || 0,
                  label: "Reits",
                  color: "#0d9488",
                },
                {
                  id: 4,
                  value: +percentages["fixedIncome"]?.toFixed(2) || 0,
                  label: "Renda fixa",
                  color: "#10b981",
                },
                {
                  id: 5,
                  value: +percentages["cryptocurrency"]?.toFixed(2) || 0,
                  label: "Criptomoedas",
                  color: "#4ade80",
                },
                {
                  id: 6,
                  value: +percentages["gold"]?.toFixed(2) || 0,
                  label: "Ouro",
                  color: "#facc15",
                },
              ],
            },
          ]}
          height={200}
          margin={{ right: 200 }}
        />
      </CardContent>
    </Card>
  );
};
