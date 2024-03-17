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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { DeleteQuestionDialog } from "./delete-question-dialog";
import { QuestionDialog } from ".";

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
            {questions && questions.length > 0 ? (
              questions.map(
                ({ id, questionId, question, criterion, diagramType }) => {
                  const answer = answers?.find(
                    (answer) => answer.questionId === questionId,
                  );
                  return (
                    <TableRow key={id}>
                      <TableCell className="text-left">{criterion}</TableCell>
                      <TableCell className="text-center">{question}</TableCell>
                      <TableCell className="flex flex-end text-end">
                        {action === "switch" ? (
                          <Select
                            key={id}
                            value={answer?.answer}
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
                          <div className=" flex  gap-2 ml-auto">
                            <QuestionDialog
                              isEditMode
                              defaultValues={{
                                id: id!,
                                criterion,
                                question,
                                diagramType,
                              }}
                            />
                            <DeleteQuestionDialog questionId={id!} />
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                },
              )
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Nenhuma pergunta encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
