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
import {
  formatToRealCurrency,
  calculatePercentageOfAsset,
  calculateTotalAssetsInGroup,
  renderTypeAsset,
  removeSAFromText,
} from "@/utils";
import { EditAssetDialog } from "@/components";

interface WalletTableProps {
  assets: IAsset[];
}

export const WalletTable: React.FC<WalletTableProps> = ({ assets }) => {
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
            {assets && assets.length > 0 ? (
              assets.map((asset) => {
                const {
                  id,
                  ticker,
                  total,
                  rate,
                  qtd,
                  assetGroup,
                  exchangeName,
                } = asset;
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
                    <TableCell>{removeSAFromText(ticker)}</TableCell>
                    <TableCell>{formatToRealCurrency(total)}</TableCell>
                    <TableCell>{percentageOfAsset}%</TableCell>
                    <TableCell>
                      {rate !== undefined && rate !== null
                        ? rate
                        : "Não avaliado"}
                    </TableCell>
                    <TableCell>{qtd}</TableCell>
                    <TableCell className="text-end">
                      <EditAssetDialog
                        asset={{
                          assetGroup: assetGroup!,
                          exchangeName,
                          rate: +rate!,
                          ticker,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" className="pt-2">
                  Nenhum ativo encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
