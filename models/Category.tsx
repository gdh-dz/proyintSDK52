// models/Category.tsx
import { QueryDocumentSnapshot } from "firebase/firestore";
import { app } from "../firebaseConfig";
import { getFirestore } from "firebase/firestore";
const db = getFirestore(app);

export class Category {
  nombre: string;
  iconURL: string; // ID de la lista a la que pertenece la categoría

  constructor(nombre: string, iconURL: string) {
    this.nombre = nombre;
    this.iconURL = iconURL;
  }

  toFirestore(): { nombre: string; iconURL: string} {
    return {
      nombre: this.nombre,
      iconURL: this.iconURL
    };
  }

  static fromFirestore(snapshot: QueryDocumentSnapshot): Category {
    const data = snapshot.data();
    return new Category(data.nombre, data.iconURL);
  }
}
