// models/User.tsx
import { QueryDocumentSnapshot } from "firebase/firestore";
// Ajusta la ruta según tu estructura de carpetas
import { app } from "@/firebaseConfig";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"; // Asegúrate de importar las funciones necesarias

const db = getFirestore(app); // Asegúrate de usar la instancia de firebaseApp aquí

export class User {
  id?: string; // Propiedad opcional para almacenar el ID de la lista
  email: string;
  name: string;

  constructor(email: string, name: string, id?: string) {
    // Agregar el id al constructor como opcional

    if (!email || !name) {
      throw new Error("Email and Name are required fields.");
    }

    this.id = id; // Asignar el id solo si se pasa como argumento
    this.email = email;
    this.name = name;
  }

  toFirestore(): { email: string; name: string } {
    return {
      email: this.email,
      name: this.name,
    };
  }

  static fromFirestore(snapshot: QueryDocumentSnapshot): User {
    const data = snapshot.data();
    return new User(data.email, data.name, snapshot.id); // Asignar el id del documento de Firestore
  }
}
