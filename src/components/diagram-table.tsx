import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";

export const DiagramTable: React.FC = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Perguntas</TableHead>
          <TableHead className="text-left">Critério</TableHead>
          <TableHead className="text-center">Resposta</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="text-left">
            A dívida líquida da empresa é menor que lucro líquido dos últimos 12
            meses?
          </TableCell>
          <TableCell className="text-left">
            Dívida líquida - lucro líquido
          </TableCell>
          <TableCell className="text-center">
            <Switch id="answer" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
