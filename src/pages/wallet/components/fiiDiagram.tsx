import React, { useEffect, useState } from "react";
import { QuestionData, getQuestionByDiagramType } from "@/services/questions";
import { DiagramTable } from "@/components";

export const FiiDiagram: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionData[] | null>(null);

  const getQuestions = async () => {
    const question = await getQuestionByDiagramType("fii");
    setQuestions(question);
    console.log(questions);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return <DiagramTable questions={questions} action="edit" />;
};
