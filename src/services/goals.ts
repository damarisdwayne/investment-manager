import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase/config";

export interface Goal {
  id?: number | string;
  stock: number[];
  stockUsa: number[];
  fixedIncome: number[];
  fii: number[];
  reits: number[];
  criptocurrency: number[];
  gold: number[];
}

export const getGoal = async (): Promise<Goal | null> => {
  const currentUser = auth.currentUser?.uid;
  const currentGoalId = "caeJwJzpwMa5Ts5txf12";
  const userGoalsRef = doc(db, "users", currentUser!, "goals", currentGoalId);
  const docSnapshot = await getDoc(userGoalsRef);
  if (docSnapshot.exists()) {
    const data = docSnapshot.data();
    return {
      id: docSnapshot.id,
      stock: data?.stock,
      stockUsa: data?.stockUsa,
      fixedIncome: data?.fixedIncome,
      fii: data?.fii,
      reits: data?.reits,
      criptocurrency: data?.criptocurrency,
      gold: data?.gold,
    };
  } else {
    return null;
  }
};

export const addGoal = async (goals: Goal) => {
  const currentUser = auth.currentUser?.uid;
  const currentGoalId = "caeJwJzpwMa5Ts5txf12";
  const userGoalsRef = doc(db, "users", currentUser!, "goals", currentGoalId);
  await setDoc(userGoalsRef, goals, { merge: true });
};
