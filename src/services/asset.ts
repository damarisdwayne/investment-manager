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
import {
  IStock,
  IAssetInfo,
  IAsset,
  AnswerData,
  IYahooFinanceAssetData,
  IYahooFinanceChartData,
  QuoteData,
  Result,
  AssetInfoData,
  CoinData,
  QuoteListResponse,
  StockDetail,
  AvaiableStockList,
  ExchangeRateResponse,
} from "@/types/asset";
import axios, { AxiosResponse } from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_REST_API_URL;
const YAHOO_API_BASE_URL = import.meta.env.VITE_APP_YAHOO_REST_API_URL;

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

export const addAsset = async (asset: IAsset, answers?: AnswerData[]) => {
  try {
    const currentUser = auth.currentUser?.uid;
    const userAssetsRef = collection(db, "users", currentUser!, "assets");
    const ticker = asset.ticker;
    const operationType = asset.operation;
    const tickerWithoutSpecialChars = ticker.replace(/[%/]/g, "");
    const tickerWithoutWhiteSpace = tickerWithoutSpecialChars.replace(
      /\s/g,
      "",
    );
    const isStockExchange =
      asset.assetGroup === "stock" ||
      asset.assetGroup === "fii" ||
      asset.assetGroup === "fiAgro";

    const assetDocRef = await doc(userAssetsRef, tickerWithoutWhiteSpace);
    const assetDocSnapshot = await getDoc(assetDocRef);

    if (assetDocSnapshot.exists()) {
      const assetData = assetDocSnapshot.data();
      let qtd = +assetData.qtd || 0;
      let total = +assetData.total || 0;
      let price = +assetData.price || 0;

      if (operationType === "manualBuy" || operationType === "application") {
        total += +asset.total!;
        qtd += +asset.qtd! || 0;
      } else if (operationType === "manualSell") {
        total -= +asset.total!;
        qtd -= +asset.qtd! || 0;
      }

      if (isStockExchange) {
        price = total / qtd;
      }

      await updateDoc(assetDocRef, {
        ...assetData,
        qtd: +qtd || 0,
        total: +total,
        price: +price || 0,
        rate: +asset.rate!,
      });
    } else {
      await setDoc(assetDocRef, {
        ...asset,
        qtd: +asset.qtd! || 0,
        total: +asset.total,
        price: +asset.price! || 0,
        rate: +asset.rate!,
      });
    }

    if (isStockExchange) {
      const answersRef = doc(assetDocRef, "answers", "allAssetAnswers");
      await setDoc(answersRef, { answers: answers });
    }

    const transactionsRef = collection(assetDocRef, "transactions");
    await addDoc(transactionsRef, {
      qtd: asset.qtd || 0,
      price: asset.price || 0,
      date: asset.operationDate,
      operation: asset.operation,
      operationType: asset.operationType,
    });

    alert("Ativo adicionado com sucesso");
  } catch (error) {
    alert(`Erro ao tentar adicionar ativo:, ${error}`);
  }
};

export const getAssetsFromBrapi = async (type: string): Promise<IStock> => {
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

export const getAssetInfoFromBrapi = async (
  ticker: string,
): Promise<AssetInfoData[]> => {
  try {
    const response: AxiosResponse<IAssetInfo, any> = await axios.get(
      `${API_BASE_URL}quote/${ticker}?modules=summaryProfile&fundamental=true&token=hYMyvWvUKauVtUQ9iUvkUS`,
    );
    return response.data.results;
  } catch (error) {
    throw new Error("Error on fetch asset list");
  }
};

export const getQuoteListFromBrapi = async (
  search: string,
): Promise<StockDetail[]> => {
  try {
    const response: AxiosResponse<QuoteListResponse, any> = await axios.get(
      `${API_BASE_URL}quote/list?search=${search}&token=hYMyvWvUKauVtUQ9iUvkUS`,
    );
    return response.data.stocks;
  } catch (error) {
    throw new Error("Error on fetch asset list");
  }
};

export const getAvaiableAssetsFromBrapi = async (
  search: string,
): Promise<string[]> => {
  try {
    const response: AxiosResponse<AvaiableStockList, any> = await axios.get(
      `${API_BASE_URL}available?search=${search}&token=hYMyvWvUKauVtUQ9iUvkUS`,
    );
    return response.data.stocks;
  } catch (error) {
    throw new Error("Error on fetch asset list");
  }
};

export const getAvaiableCryptoFromBrapi = async (
  search: string,
): Promise<string[]> => {
  try {
    const response: AxiosResponse<CoinData, any> = await axios.get(
      `${API_BASE_URL}v2/crypto/available?search=${search}&token=hYMyvWvUKauVtUQ9iUvkUS`,
    );
    return response.data.coins;
  } catch (error) {
    throw new Error("Error on fetch crypto list");
  }
};

export const getPriceDollar = async (): Promise<Record<string, number>> => {
  try {
    const response: AxiosResponse<ExchangeRateResponse, any> = await axios.get(
      "https://api.fastforex.io/fetch-multi?from=USD&to=BRL&api_key=5af3c310ea-7dfc5329a8-sagr2a",
    );
    return response.data.results;
  } catch (error) {
    throw new Error("Error on fetch price dollar");
  }
};

export const getAssetChartFromYahoo = async (
  ticker: string,
): Promise<Result[]> => {
  const response: AxiosResponse<IYahooFinanceChartData, any> = await axios.get(
    `${YAHOO_API_BASE_URL}v8/finance/chart/${ticker}`,
  );
  return response.data.chart.result;
};

export const getAssetInfoFromYahoo = async (
  search: string,
): Promise<QuoteData[]> => {
  try {
    const response: AxiosResponse<IYahooFinanceAssetData, any> =
      await axios.get(`${YAHOO_API_BASE_URL}v1/finance/search?q=${search}`);
    return response.data.quotes;
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
