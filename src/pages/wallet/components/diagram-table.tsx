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
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const DiagramTable: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Perguntas</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Critério</TableHead>
              <TableHead className="text-left">Perguntas</TableHead>
              <TableHead className="text-center">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-left">
                Dívida líquida - lucro líquido
              </TableCell>
              <TableCell className="text-left">
                A dívida líquida da empresa é menor que lucro líquido dos
                últimos 12 meses?
              </TableCell>
              <TableCell className="text-center">
                <Button className="gap-1">
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
