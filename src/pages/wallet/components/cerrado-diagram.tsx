import React, { useEffect, useState } from "react";
import { QuestionData, getQuestionByDiagramType } from "@/services/questions";
import { DiagramTable } from "@/components";

export const CerradoDiagram: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionData[] | null>(null);

  const getQuestions = async () => {
    const question = await getQuestionByDiagramType("cerradoDiagram");
    setQuestions(question);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return <DiagramTable questions={questions} action="edit" />;
};
