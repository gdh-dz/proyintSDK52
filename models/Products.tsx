// models/Producto.tsx
import { QueryDocumentSnapshot } from "firebase/firestore";
import { app } from "../firebaseConfig";
import { getFirestore } from "firebase/firestore";
const db = getFirestore(app);

export class Producto {
  id?: string; // Propiedad opcional para almacenar el ID de la lista
  nombre: string | null;
  categoria: string | null;
  precio: number | null;
  imagenURL: string | null;
  creadoPor: string | null;
  fechaCreacion: Date | null;

  constructor(
    id: string | null = null, // Agregar el id al constructor como opcional

    nombre: string | null = null,
    categoria: string | null = null,
    precio: number | null = null,
    imagenURL: string | null = null,
    creadoPor: string | null = null,
    fechaCreacion: Date | null = null
  ) {
    this.id = id ?? undefined;

    this.nombre = nombre;
    this.categoria = categoria;
    this.precio = precio;
    this.imagenURL = imagenURL;
    this.creadoPor = creadoPor;
    this.fechaCreacion = fechaCreacion;
  }

  toFirestore(): {
    nombre: string | null;
    categoria: string | null;
    precio: number | null;
    imagenURL: string | null;
    creadoPor: string | null;
    fechaCreacion: Date | null;
  } {
    return {
      nombre: this.nombre,
      categoria: this.categoria,
      precio: this.precio,
      imagenURL: this.imagenURL,
      creadoPor: this.creadoPor,
      fechaCreacion: this.fechaCreacion,
    };
  }

  static fromFirestore(snapshot: QueryDocumentSnapshot): Producto {
    const data = snapshot.data();
    return new Producto(
      snapshot.id, // Asignar el ID del documento Firestore a la propiedad id
      data.nombre ?? null,
      data.categoria ?? null,
      data.precio ?? null,
      data.imagenURL ?? null,
      data.creadoPor ?? null,
      data.fechaCreacion ? data.fechaCreacion.toDate() : null
    );
  }
}
