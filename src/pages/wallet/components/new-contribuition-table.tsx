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
import { PlusIcon } from "@radix-ui/react-icons";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const NewContribuitionTable: React.FC = () => {
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
              <TableHead>Resistência</TableHead>
              <TableHead>Recomendado %</TableHead>
              <TableHead>Total %</TableHead>
              <TableHead>Sugestão</TableHead>
              <TableHead className="w-[20%]">Valor atual</TableHead>
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
              <TableCell>ITSA4</TableCell>
              <TableCell>5</TableCell>
              <TableCell>26,67%</TableCell>
              <TableCell>10%</TableCell>
              <TableCell>R$85.000,00</TableCell>
              <TableCell>R$ 60.000,00</TableCell>
              <TableCell>
                <Button className="gap-2 align-middle">
                  <PlusIcon /> Aportar
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
