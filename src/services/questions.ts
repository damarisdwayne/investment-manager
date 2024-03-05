import {
  DocumentSnapshot,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "./firebase/config";

export interface QuestionData {
  id?: string;
  questionId?: string;
  criterion: string;
  question: string;
  diagramType: "cerradoDiagram" | "fii" | string;
}
export interface AnswerData {
  questionId?: string;
  answer: string;
}

export const addQuestion = async (questionData: QuestionData) => {
  try {
    const currentUser = auth.currentUser?.uid;
    const userQuestionsRef = collection(db, "users", currentUser!, "questions");
    await addDoc(userQuestionsRef, questionData);
  } catch (error) {
    throw new Error("Erro ao adicionar pergunta");
  }
};

export const getQuestionByDiagramType = async (diagramType: string) => {
  try {
    const currentUser = auth.currentUser?.uid;
    const userQuestionsRef = collection(db, "users", currentUser!, "questions");
    const q = query(userQuestionsRef, where("diagramType", "==", diagramType));
    const querySnapshot = await getDocs(q);
    const questions: QuestionData[] = querySnapshot.docs.map(
      (doc: DocumentSnapshot) => {
        const data = doc.data();
        return {
          id: doc.id,
          questionId: data?.questionId,
          criterion: data?.criterion,
          question: data?.question,
          diagramType: data?.diagramType,
        };
      },
    );
    return questions;
  } catch (error) {
    throw new Error("Erro ao buscar diagrama");
  }
};

export const addAnswer = async (ticker: string, answerData: AnswerData[]) => {
  try {
    const currentUser = auth.currentUser?.uid;
    const userAnswersRef = collection(db, "users", currentUser!, "answers");
    const answersDocRef = doc(userAnswersRef, ticker);
    await setDoc(answersDocRef, { data: answerData });
  } catch (error) {
    throw new Error("Erro ao adicionar resposta");
  }
};

export const getAnswers = async (ticker: string) => {
  try {
    const currentUser = auth.currentUser?.uid;
    const userAnswersRef = collection(db, "users", currentUser!, "answers");

    const q = query(userAnswersRef, where(ticker, "!=", null));

    const querySnapshot = await getDocs(q);

    const answers: AnswerData[] = [];
    querySnapshot.forEach((doc) => {
      answers.push(doc.data()[ticker]);
    });

    return answers;
  } catch (error) {
    throw new Error("Erro ao buscar as respostas");
  }
};
