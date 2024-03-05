import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IAsset } from "@/types/asset";
import { formatToRealCurrency } from "@/utils";
import { AssetGroup } from "@/constants";
import {
  calculatePercentageOfAsset,
  calculateTotalAssetsInGroup,
} from "@/utils/asset";
import { EditAssetDialog } from "@/components";

interface WalletTableProps {
  assets: IAsset[];
}

export const WalletTable: React.FC<WalletTableProps> = ({ assets }) => {
  const renderTypeAsset = (assetGroup: string) => {
    switch (assetGroup) {
      case AssetGroup.STOCK:
        return "Ações";
      case AssetGroup.STOCK_USA:
        return "Ações EUA";
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
      case AssetGroup.CCB:
      case AssetGroup.CDB:
      case AssetGroup.CRA:
      case AssetGroup.CRI:
      case AssetGroup.DEBENTURE:
      case AssetGroup.DEBENTURE_INCENTIVADA:
      case AssetGroup.FIDC:
      case AssetGroup.LC:
      case AssetGroup.LCA:
      case AssetGroup.LCI:
      case AssetGroup.LF:
      case AssetGroup.LIG:
      case AssetGroup.RDB:
      case AssetGroup.RDC:
        return "Renda fixa";

      default:
        return "Criptomoeda";
    }
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Lista de ativos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Ativo</TableHead>
              <TableHead className="w-[20%]">Valor atual</TableHead>
              <TableHead>% por tipo</TableHead>
              <TableHead>Nota</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets?.map((asset) => {
              const { id, ticker, total, rate, qtd, assetGroup } = asset;
              const totalGroupAssets = calculateTotalAssetsInGroup(
                assets,
                assetGroup!,
              );
              const percentageOfAsset = calculatePercentageOfAsset(
                total,
                totalGroupAssets,
              );

              return (
                <TableRow key={id}>
                  <TableCell>
                    <Badge className={`rounded-[10px]`} variant="secondary">
                      {renderTypeAsset(assetGroup!)}
                    </Badge>
                  </TableCell>
                  <TableCell>{ticker}</TableCell>
                  <TableCell>{formatToRealCurrency(total)}</TableCell>
                  <TableCell>{percentageOfAsset}%</TableCell>
                  <TableCell>
                    {rate !== undefined && rate !== null
                      ? rate
                      : "Não avaliado"}
                  </TableCell>
                  <TableCell>{qtd}</TableCell>
                  <TableCell className="text-end">
                    <EditAssetDialog asset={asset} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
