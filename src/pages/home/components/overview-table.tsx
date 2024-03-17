import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { IAsset } from "@/types/asset";
import { formatToRealCurrency } from "@/utils";

interface OverviewTableProps {
  assets: IAsset[];
}

export const OverviewTable: React.FC<OverviewTableProps> = ({ assets }) => {
  const getAssetPercentage = () => {
    const totalAssets = assets.reduce((total, asset) => total + asset.total, 0);
    const assetPercentages: { [key: string]: number } = {};

    assets.forEach((asset) => {
      const percentage = (asset.total / totalAssets) * 100;
      assetPercentages[asset.ticker] = percentage;
    });

    return assetPercentages;
  };
  const assetPercentage = getAssetPercentage();
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ativo</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Valor atual</TableHead>
              <TableHead>% Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets?.map(({ ticker, qtd, total }) => (
              <TableRow key={ticker}>
                <TableCell>{ticker}</TableCell>
                <TableCell>{qtd === 0 ? 1 : qtd}</TableCell>
                <TableCell>{formatToRealCurrency(total || 0)}</TableCell>
                <TableCell>{assetPercentage[ticker]?.toFixed(2)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
