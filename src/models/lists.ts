import { random } from "radash";
import { firestore } from "./firestore";
import { auth } from "firebase-admin";
import { nanoid } from "nanoid";

type UserOrRole = "*" | string | false;

type Item = {
  addedAt: Date;
  note: string;
  url: string;
  order: number;
};

export interface ItemsList {
  _createdAt: Date;
  _id: string;
  _createdBy: string;
  title: string;
  canRead: {
    [userId: string]: Date;
  };
  canWrite: {
    [userId: string]: Date;
  };
  items: {
    [itemId: string]: Item;
  };
}

const converter = {
  toFirestore: (data: ItemsList) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot): ItemsList => {
    const data: any = snap.data();
    return {
      ...data,
      _createdAt: data._createdAt?.toDate(),
    };
  },
};

const authCollection = firestore.collection("lists").withConverter(converter);

export async function createList(userId: string, list: Partial<ItemsList>) {
  const newListId = nanoid();
  const listDoc = authCollection.doc(newListId);

  const newList = {
    // forced
    _createdAt: new Date(),
    _id: newListId,
    _createdBy: userId,
    // defaults
    title: list.title || "Sin título",
    canRead: list.canRead || {},
    canWrite: list.canWrite || {},
    items: list.items || {},
  };

  await listDoc.set(newList);

  return list;
}

export async function getListsCreatedBy(userId: string) {
  const listsSearch = await authCollection
    .where("_createdAt", "==", userId)
    .get();

  return listsSearch.docs.map((d) => d.data());
}
