// models/User.tsx
import { QueryDocumentSnapshot } from "firebase/firestore";
import { app } from "@/firebaseConfig";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const db = getFirestore(app);

export class User {
  id?: string; // Propiedad opcional para almacenar el ID del documento
  email: string;
  name: string;
  profileImage?: string; // Nuevo campo para la URL de la imagen de perfil

  constructor(email: string, name: string, id?: string, profileImage?: string) {
    if (!email || !name) {
      throw new Error("Email and Name are required fields.");
    }

    this.id = id; // Asignar el id solo si se pasa como argumento
    this.email = email;
    this.name = name;
    this.profileImage = profileImage; // Asignar profileImage solo si se pasa
  }

  toFirestore(): { email: string; name: string; profileImage?: string } {
    return {
      email: this.email,
      name: this.name,
      profileImage: this.profileImage, // Incluir profileImage al guardar en Firestore
    };
  }

  static fromFirestore(snapshot: QueryDocumentSnapshot): User {
    const data = snapshot.data();
    return new User(
      data.email,
      data.name,
      snapshot.id,
      data.profileImage // Recuperar profileImage desde Firestore
    );
  }
}
