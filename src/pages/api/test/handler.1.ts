import { getToken } from "lib/auth";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const newCode = await getToken("marce@apx.school");
  res.status(200).json({ newCode });
}
