import { addDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase/config";
import { IStock, IAssetInfo } from "@/types/asset";
import axios, { AxiosResponse } from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_REST_API_URL;

export const getAssets = async () => {
  const currentUser = auth.currentUser?.uid;
  const userAssetsRef = collection(db, "users", currentUser!, "assets");
  const data = await getDocs(userAssetsRef);
  console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
};

export const addAsset = async (asset: any) => {
  const currentUser = auth.currentUser?.uid;
  const userAssetsRef = collection(db, "users", currentUser!, "assets");
  await addDoc(userAssetsRef, asset);
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
