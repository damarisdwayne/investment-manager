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

export const WalletTable: React.FC = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[20%]">Tipo</TableHead>
          <TableHead>Ticker</TableHead>
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
            <Badge
              className={`bg-fixed-income text-black rounded-[10px]`}
              variant="secondary"
            >
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
  );
};
