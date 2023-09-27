import { nanoid } from "nanoid";
import { firestore } from "./firestore";

type Item = {
  addedAt: Date;
  title: string;
  note: string;
  url: string;
  listId?: string;
  _meta?: any;
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
  itemsOrder?: string[];
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

const listsCollection = firestore.collection("lists").withConverter(converter);

export async function createList(
  userId: string,
  list: Partial<ItemsList> = {}
): Promise<ItemsList> {
  const newListId = nanoid();
  const listDoc = listsCollection.doc(newListId);

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

  return newList;
}

export async function getListsCreatedBy(userId: string) {
  const listsSearch = await listsCollection
    .where("_createdAt", "==", userId)
    .get();

  return listsSearch.docs.map((d) => d.data());
}
export async function getListById(listId: string): Promise<ItemsList> {
  const list = await listsCollection.doc(listId).get();

  return list.data() as ItemsList;
}
