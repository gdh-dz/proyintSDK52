// services/userService.ts
import { User } from "@/models/User";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { setDoc, doc, getFirestore } from "firebase/firestore";
import { app } from "@/firebaseConfig";

// Inicializa Firebase Authentication y Firestore usando la instancia de la app
const auth = getAuth(app);
const db = getFirestore();

// Función para iniciar sesión
export const loginUser = async (identifier: string, password: string) => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, identifier, password);
    const user = userCredential.user;

    return {
      uid: user.uid,
      email: user.email,
      // Puedes agregar otros campos del usuario si es necesario
    };
  } catch (error) {
    const errorMessage = (error as Error).message || "Unknown error occurred";
    console.error("Error logging in:", error);
    throw new Error(`Error logging in: ${errorMessage}`);
  }
};

// Función para crear un nuevo usuario
export const createUser = async (
  email: string,
  password: string,
  name: string,
  phone: string
): Promise<{ uid: string; email: string; name: string; phone: string }> => {
  try {
    // Crear usuario en Firebase Authentication
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Crear instancia de usuario y subir a Firestore
    const userData = {
      email,
      name,
      phone,
    };

    await setDoc(doc(db, "users", uid), userData);

    return { uid, email, name, phone };
  } catch (error) {
    console.error("Error creating user:", error);
    const errorMessage = (error as Error).message || "Unknown error occurred";
    throw new Error(`Error creating user: ${errorMessage}`);
  }
};

// Función auxiliar para crear usuario sin autenticación (opcional, si solo necesitas Firestore)
export const createUserInFirestore = async (
  email: string,
  name: string,
  phone: string
): Promise<{ email: string; name: string; phone: string }> => {
  try {
    const userId = email.split("@")[0]; // Generar un ID basado en el correo (puedes usar otro método)
    const userData = { email, name, phone };

    await setDoc(doc(db, "users", userId), userData);

    return userData;
  } catch (error) {
    console.error("Error creating user in Firestore:", error);
    const errorMessage = (error as Error).message || "Unknown error occurred";
    throw new Error(`Error creating user in Firestore: ${errorMessage}`);
  }
};
