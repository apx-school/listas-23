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
