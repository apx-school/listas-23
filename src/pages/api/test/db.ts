import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "lib/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const doc = firestore.collection("users").doc("test");
  const dbRes = await doc.set({
    email: "marce@apx.school",
  });

  res.status(200).json(dbRes);
}
