import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const WalletTable: React.FC = () => {
  return (
    <Card className="flex-[3]">
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
            <TableRow>
              <TableCell>
                <Badge className={`rounded-[10px]`} variant="secondary">
                  Renda fixa
                </Badge>
              </TableCell>
              <TableCell>Prefixado</TableCell>
              <TableCell>R$ 60.000,00</TableCell>
              <TableCell>26,67%</TableCell>
              <TableCell>10</TableCell>
              <TableCell>35</TableCell>
              <TableCell>
                <Button className="gap-2 align-middle">
                  <Pencil1Icon /> Editar
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
