import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "lib/firestore";
import { getOrCreateUserByEmail } from "lib/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const doc = firestore.collection("users").doc("test");
  // const newUser = await getOrCreateUserByEmail("marce@apx.school");

  res.status(200).json({});
}
