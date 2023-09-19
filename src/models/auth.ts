import { random } from "radash";
import { firestore } from "./firestore";
import { auth } from "firebase-admin";

export interface Auth {
  userId: string;
  code: string;
  codeCreatedAt: Date;
}

const converter = {
  toFirestore: (data: Auth) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot): Auth => {
    const authData: any = snap.data();
    return {
      ...authData,
      codeCreatedAt: authData.codeCreatedAt?.toDate(),
    };
  },
};

const authCollection = firestore.collection("auth").withConverter(converter);

export async function generateCode(userId: string) {
  const authDoc = authCollection.doc(userId);
  const newCode = random(10000, 99999);

  const newAuth = {
    code: newCode.toString(),
    codeCreatedAt: new Date(),
    userId,
  };

  await authDoc.set(newAuth);

  return newAuth;
}

export async function getAuthByUserId(userId: string) {
  const authDoc = authCollection.doc(userId);
  const authSnap = await authDoc.get();

  if (authSnap.exists) {
    return authSnap.data();
  } else {
    throw "Ese auth no existe";
  }
}
