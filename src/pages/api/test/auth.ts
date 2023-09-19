import { getToken, sendCode } from "lib/auth";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const token = await getToken("marce@apx.school", "93146");
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error });
  }
}
