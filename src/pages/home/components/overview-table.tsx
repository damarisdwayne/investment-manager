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

export const OverviewTable: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ativo</TableHead>
              <TableHead>Valor atual</TableHead>
              <TableHead>% Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>ITSA4</TableCell>
              <TableCell>R$ 5.000,00</TableCell>
              <TableCell>3.95%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>BBSA3</TableCell>
              <TableCell>R$ 7.890,56</TableCell>
              <TableCell>5.00%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ITSA4</TableCell>
              <TableCell>R$ 5.000,00</TableCell>
              <TableCell>3.95%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>BBSA3</TableCell>
              <TableCell>R$ 7.890,56</TableCell>
              <TableCell>5.00%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ITSA4</TableCell>
              <TableCell>R$ 5.000,00</TableCell>
              <TableCell>3.95%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>BBSA3</TableCell>
              <TableCell>R$ 7.890,56</TableCell>
              <TableCell>5.00%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
