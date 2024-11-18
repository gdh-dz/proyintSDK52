// models/List.tsx
import { QueryDocumentSnapshot } from "firebase/firestore";
import { app } from "../firebaseConfig";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(app);

export class List {
  id?: string; // Propiedad opcional para almacenar el ID de la lista
  budget: number | null;
  creationDate: Date | null;
  listName: string | null;
  usersInList: string[] | null;
  categories: string[] | null; // Array de categorías relacionadas a esta lista
  montoArticulos: number | null;
  montoLista: number | null;
  status: string | null;
  totalPrice: number | null;

  constructor(
    id: string | null = null, // Agregar el id al constructor como opcional
    budget: number | null = null,
    creationDate: Date | null = null,
    listName: string | null = null,
    usersInList: string[] | null = null,
    categories: string[] | null = null,
    montoArticulos: number | null = null,
    montoLista: number | null = null,
    status: string | null = null,
    totalPrice: number | null = null
  ) {
    this.id = id ?? undefined;
    this.budget = budget;
    this.creationDate = creationDate;
    this.listName = listName;
    this.usersInList = usersInList;
    this.categories = categories;
    this.montoArticulos = montoArticulos;
    this.montoLista = montoLista;
    this.status = status;
    this.totalPrice = totalPrice;
  }

  toFirestore(): {
    budget: number | null;
    creationDate: Date | null;
    listName: string | null;
    usersInList: string[] | null;
    categories: string[] | null;
    montoArticulos: number | null;
    montoLista: number | null;
    status: string | null;
    totalPrice: number | null;
  } {
    return {
      budget: this.budget,
      creationDate: this.creationDate,
      listName: this.listName,
      usersInList: this.usersInList,
      categories: this.categories,
      montoArticulos: this.montoArticulos,
      montoLista: this.montoLista,
      status: this.status,
      totalPrice: this.totalPrice,
    };
  }

  static fromFirestore(snapshot: QueryDocumentSnapshot): List {
    const data = snapshot.data();
    return new List(
      snapshot.id, // Asignar el ID del documento Firestore a la propiedad id
      data.budget ?? null,
      data.creationDate ? data.creationDate.toDate() : null,
      data.listName ?? null,
      data.usersInList ?? null,
      data.categories ?? null,
      data.montoArticulos ?? null,
      data.montoLista ?? null,
      data.status ?? null,
      data.totalPrice ?? null
    );
  }
}
