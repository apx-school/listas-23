import { getToken, sendCode } from "lib/auth";
import { createList } from "models/lists";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const newList = await createList("nh6ES9IN0H-CUl_9oZvl_", {
      title: "Mi segunda lista",
    });
    res.status(200).json(newList);
  } catch (error) {
    res.status(400).json({ error });
  }
}
