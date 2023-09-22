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
  _createdAt?: Date;
  _id?: string;
  ownerId: string;
  title: string;
  canRead: UserOrRole[];
  canWrite: UserOrRole[];
  items: {
    [key: string]: Item;
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

export async function createList(list: ItemsList) {
  const newListId = nanoid();
  const listDoc = authCollection.doc(newListId);
  list._createdAt = new Date();
  list._id = newListId;

  await listDoc.set(list);

  return list;
}

export async function getListsByUserId(userId: string) {
  const listsSearch = await authCollection.where("ownerId", "==", userId).get();

  return listsSearch.docs.map((d) => d.data());
}
