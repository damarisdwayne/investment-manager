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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AssetCategory } from "../new-contribuition";
import {
  formatToRealCurrency,
  formattedPercentage,
  removeSAFromText,
  renderTypeAsset,
} from "@/utils";
import { EditAssetDialog } from "@/components";

interface NewContribuitionTableProps {
  showShowContribuitionColumn: boolean;
  categorizedAssets: AssetCategory[];
  assetAllocations: Record<string, number>[];
}

export const NewContribuitionTable: React.FC<NewContribuitionTableProps> = ({
  categorizedAssets,
  assetAllocations,
  showShowContribuitionColumn,
}) => {
  const getValueForContribuition = (ticket: string) => {
    let valueToContribuition = 0;
    assetAllocations?.forEach((allocation) => {
      if (ticket in allocation) {
        valueToContribuition = allocation[ticket];
        return;
      }
    });
    return valueToContribuition;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sugestão de ativos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Ativo</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Qtd</TableHead>
              <TableHead>Nota</TableHead>
              <TableHead>Ideal %</TableHead>
              <TableHead>Total %</TableHead>
              <TableHead>Ideal R$</TableHead>
              <TableHead>Total R$</TableHead>
              {showShowContribuitionColumn && (
                <>
                  <TableHead>Aportar</TableHead>
                  <TableHead>Qtd aporte</TableHead>
                </>
              )}
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categorizedAssets && categorizedAssets.length > 0 ? (
              categorizedAssets.map(({ assets }) =>
                assets.map((asset) => {
                  const {
                    assetGroup,
                    ticker,
                    exchangeName,
                    rate,
                    recommendedPercentage,
                    currentPercentage,
                    suggestedValueForAsset,
                    price,
                    qtd,
                    total,
                  } = asset;
                  const valueForContribuition =
                    getValueForContribuition(ticker);
                  const qtdForContribuition = valueForContribuition / price;
                  return (
                    <TableRow key={ticker}>
                      <TableCell>
                        <Badge className={`rounded-[10px]`} variant="secondary">
                          {renderTypeAsset(assetGroup!)}
                        </Badge>
                      </TableCell>
                      <TableCell>{removeSAFromText(ticker)}</TableCell>
                      <TableCell>{formatToRealCurrency(price)}</TableCell>
                      <TableCell>{qtd === 0 ? 1 : qtd}</TableCell>
                      <TableCell>{rate}</TableCell>
                      <TableCell>
                        {formattedPercentage(recommendedPercentage || 0)}
                      </TableCell>
                      <TableCell>
                        {formattedPercentage(currentPercentage || 0)}
                      </TableCell>
                      <TableCell>
                        {formatToRealCurrency(suggestedValueForAsset || 0)}
                      </TableCell>
                      <TableCell>{formatToRealCurrency(total)}</TableCell>
                      {showShowContribuitionColumn && (
                        <>
                          <TableCell>
                            {formatToRealCurrency(valueForContribuition)}
                          </TableCell>
                          <TableCell>
                            {assetGroup === "fixedIncome"
                              ? "-"
                              : Math.floor(qtdForContribuition)}
                          </TableCell>
                        </>
                      )}
                      <TableCell>
                        <EditAssetDialog
                          asset={{
                            assetGroup,
                            ticker,
                            exchangeName,
                            rate,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                }),
              )
            ) : (
              <TableRow>
                <TableCell
                  colSpan={showShowContribuitionColumn ? 12 : 10}
                  align="center"
                >
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
