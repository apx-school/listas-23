import { nanoid } from "nanoid";
import { firestore } from "./firestore";
const usersCollection = firestore.collection("users");

export interface User {
  _id: string;
  _createdAt: Date;
  email: string;
}

export async function getOrCreateUserByEmail(email: string): Promise<User> {
  const nEmail = normalizeEmail(email);
  const searchResults = await usersCollection
    .where("email", "==", nEmail)
    .get();

  if (searchResults.size > 0) {
    const userSnap = searchResults.docs[0];

    return userFromSnap(userSnap);
  } else {
    const newId = nanoid();
    const userDoc = usersCollection.doc(newId);

    const newUser: User = {
      _createdAt: new Date(),
      _id: newId,
      email: nEmail,
    };
    await userDoc.set(newUser);
    return newUser;
  }
}

export function normalizeEmail(email: string) {
  return email.toLowerCase().trim();
}

export async function getUserIdByEmail(email: string) {
  const search = await usersCollection
    .where("email", "==", email)
    .limit(1)
    .select()
    .get();

  if (search.empty) {
    throw "No existe ese mail";
  }

  return search.docs[0]?.id;
}
export async function getUserById(userId: string) {
  const userSnap = await usersCollection.doc(userId).get();

  return userSnap.exists ? userFromSnap(userSnap) : null;
}

export function userFromSnap(
  snap:
    | FirebaseFirestore.QueryDocumentSnapshot
    | FirebaseFirestore.DocumentSnapshot
): User {
  const userData: any = snap.data();
  return {
    ...userData,
    _createdAt: userData._createdAt?.toDate(),
  };
}
