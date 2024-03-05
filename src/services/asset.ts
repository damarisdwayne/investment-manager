import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase/config";
import { IStock, IAssetInfo, IAsset, AnswerData } from "@/types/asset";
import axios, { AxiosResponse } from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_REST_API_URL;

export const getAssets = async () => {
  const currentUser = auth.currentUser?.uid;
  const userAssetsRef = collection(db, "users", currentUser!, "assets");
  const querySnapshot = await getDocs(userAssetsRef);
  const assets = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return assets;
};

export const addAsset = async (asset: IAsset, answers: AnswerData[]) => {
  try {
    const currentUser = auth.currentUser?.uid;
    const userAssetsRef = collection(db, "users", currentUser!, "assets");
    const ticker = asset.ticker;
    const operationType = asset.operation;

    const assetDocRef = await doc(userAssetsRef, ticker);
    const assetDocSnapshot = await getDoc(assetDocRef);

    if (assetDocSnapshot.exists()) {
      const assetData = assetDocSnapshot.data();
      let qtd = +assetData.qtd || 0;
      let total = +assetData.total || 0;
      let price = +assetData.price || 0;

      if (operationType === "manualBuy") {
        total += +asset.total!;
        qtd += +asset.qtd!;
      } else if (operationType === "manualSell") {
        total -= +asset.total!;
        qtd -= +asset.qtd!;
      }

      price = total / qtd;

      await updateDoc(assetDocRef, {
        ...assetData,
        qtd: +qtd,
        total: +total,
        price: +price,
        rate: +asset.rate!,
      });
    } else {
      await setDoc(assetDocRef, {
        ...asset,
        qtd: +asset.qtd!,
        total: +asset.total,
        price: +asset.price!,
        rate: +asset.rate!,
      });
    }

    const answersRef = doc(assetDocRef, "answers", "allAssetAnswers");
    await setDoc(answersRef, { answers: answers });

    const transactionsRef = collection(assetDocRef, "transactions");
    await addDoc(transactionsRef, {
      qtd: asset.qtd,
      price: asset.price,
      date: asset.operationDate,
      operation: asset.operation,
      operationType: asset.operationType,
    });

    alert("Ativo adicionado com sucesso");
  } catch (error) {
    alert(`Erro ao tentar adicionar ativo:, ${error}`);
  }
};

export const getAssetsFromB3 = async (type: string): Promise<IStock> => {
  try {
    const response: AxiosResponse<IStock, any> = await axios.get(
      `${API_BASE_URL}quote/list?sortBy=name&sortOrder=asc&token=hYMyvWvUKauVtUQ9iUvkUS${
        type ? `&type=${type}` : ""
      }`,
    );
    return response.data;
  } catch (error) {
    throw new Error("Error on fetch asset list");
  }
};

export const getAssetInfo = async (
  ticker: string,
  modules: string = "summaryProfile",
): Promise<IAssetInfo> => {
  try {
    const response: AxiosResponse<IAssetInfo, any> = await axios.get(
      `${API_BASE_URL}quote/${ticker}?modules=${modules}&fundamental=true&token=hYMyvWvUKauVtUQ9iUvkUS`,
    );
    return response.data;
  } catch (error) {
    throw new Error("Error on fetch asset list");
  }
};

export const getAssetTransactions = async (ticker: string) => {
  try {
    const currentUser = auth.currentUser?.uid;
    const userAssetsRef = collection(db, "users", currentUser!, "assets");
    const assetDocRef = doc(userAssetsRef, ticker);
    const transactionsRef = collection(assetDocRef, "transactions");

    const q = query(transactionsRef);

    const querySnapshot = await getDocs(q);

    const transactions = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return transactions;
  } catch (error) {
    throw new Error("Erro ao buscar as transações do ativo");
  }
};

export const getAssetAnswers = async (ticker: string) => {
  try {
    const currentUser = auth.currentUser?.uid;
    const userAssetsRef = collection(db, "users", currentUser!, "assets");
    const assetDocRef = doc(userAssetsRef, ticker);
    const answersRef = collection(assetDocRef, "answers");

    const q = query(answersRef);

    const querySnapshot = await getDocs(q);

    const answers = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      answers: doc.data().answers,
    }));

    const answersArray = answers[0]?.answers;

    return answersArray;
  } catch (error) {
    throw new Error("Erro ao buscar as respostas do ativo");
  }
};
