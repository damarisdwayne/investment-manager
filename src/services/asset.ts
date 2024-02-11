import { addDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase/config";

export const getAssets = async () => {
  const currentUser = auth.currentUser?.uid;
  const userAssetsRef = collection(db, "users", currentUser!, "assets");
  const data = await getDocs(userAssetsRef);
  console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
};

export const addAsset = async () => {
  const currentUser = auth.currentUser?.uid;
  const userAssetsRef = collection(db, "users", currentUser!, "assets");
  const result = await addDoc(userAssetsRef, {
    category: "bolsa4",
    type: "bolsa4",
    operation: "purchase",
  });

  console.log(result);
};
