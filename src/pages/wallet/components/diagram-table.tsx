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
import { QuestionData } from "@/services/question";

interface DiagramTableProps {
  questions: QuestionData[] | null;
}

export const DiagramTable: React.FC<DiagramTableProps> = ({ questions }) => {
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
            {questions?.map((question) => (
              <TableRow key={question?.id}>
                <TableCell className="text-left">
                  {question?.criterion}
                </TableCell>
                <TableCell className="text-left">
                  {question?.question}
                </TableCell>
                <TableCell className="text-center">
                  <Button className="gap-1">
                    <Pencil1Icon /> Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
