import { db } from "../firebaseConfig";
import { doc, setDoc, deleteDoc, updateDoc, collection, query, where, getDocs,getDoc  } from "firebase/firestore";
import { Category } from "../models/Category";

export async function getCategorys(): Promise<Category[]> {
    const CategorysCollection = collection(db, "categorias");
    const querySnapshot = await getDocs(CategorysCollection);
    console.log("Categorias:")
    console.log(querySnapshot.docs.map(doc => Category.fromFirestore(doc)))
    return querySnapshot.docs.map(doc => Category.fromFirestore(doc));
  }