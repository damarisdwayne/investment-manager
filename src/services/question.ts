import {
  DocumentSnapshot,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "./firebase/config";

export interface QuestionData {
  id?: string;
  criterion: string;
  question: string;
  diagramType: "cerradoDiagram" | "fiiDiagram" | string;
}

export const addQuestion = async (questionData: QuestionData) => {
  const currentUser = auth.currentUser?.uid;
  const userQuestionsRef = collection(db, "users", currentUser!, "questions");
  await addDoc(userQuestionsRef, questionData);
};

export const getQuestionByDiagramType = async (diagramType: string) => {
  const currentUser = auth.currentUser?.uid;
  const userQuestionsRef = collection(db, "users", currentUser!, "questions");
  const q = query(userQuestionsRef, where("diagramType", "==", diagramType));
  const querySnapshot = await getDocs(q);
  const questions: QuestionData[] = querySnapshot.docs.map(
    (doc: DocumentSnapshot) => {
      const data = doc.data();
      return {
        id: doc.id,
        criterion: data?.criterion,
        question: data?.question,
        diagramType: data?.diagramType,
      };
    },
  );
  return questions;
};
