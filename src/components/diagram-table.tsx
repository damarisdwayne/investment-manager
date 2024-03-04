import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnswerData, QuestionData } from "@/services/questions";
import { Button } from "./ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface DiagramTableProps {
  questions: QuestionData[] | null;
  action: "switch" | "edit";
  answers?: AnswerData[];
  setAnswers?: React.Dispatch<React.SetStateAction<AnswerData[]>>;
}

export const DiagramTable: React.FC<DiagramTableProps> = ({
  questions,
  action,
  answers,
  setAnswers,
}) => {
  const handleSwitchChange = (questionId: string, value: string) => {
    const updatedAnswers = answers ? [...answers] : [];
    const index = updatedAnswers.findIndex(
      (answer) => answer?.questionId === questionId,
    );

    if (index !== -1) {
      updatedAnswers[index].answer = value === "yes" ? "yes" : "no";
    } else {
      updatedAnswers.push({
        questionId,
        answer: value === "yes" ? "yes" : "no",
      });
    }

    setAnswers && setAnswers(updatedAnswers);
    console.log(updatedAnswers, answers);
  };

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
              <TableHead className="text-center">Perguntas</TableHead>
              <TableHead className="text-end">
                <span className="mr-8">Ação</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions?.map(({ id, questionId, question, criterion }) => (
              <TableRow key={id}>
                <TableCell className="text-left">{criterion}</TableCell>
                <TableCell className="text-center">{question}</TableCell>
                <TableCell className="flex flex-end text-end">
                  {action === "switch" ? (
                    <Select
                      key={id}
                      onValueChange={(value) =>
                        handleSwitchChange(questionId!, value)
                      }
                    >
                      <SelectTrigger className="w-[80px] ml-auto">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Resposta</SelectLabel>
                          <SelectItem value="yes">Sim</SelectItem>
                          <SelectItem value="no">Não</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Button className="gap-1  ml-auto">
                      <Pencil1Icon /> Editar
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
