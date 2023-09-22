import { getToken, sendCode } from "lib/auth";
import { createList } from "models/lists";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const newList = await createList({
      title: "Mi segunda lista",
      items: {},
      canRead: ["*"],
      canWrite: [false],
      ownerId: "nh6ES9IN0H-CUl_9oZvl_",
    });
    res.status(200).json(newList);
  } catch (error) {
    res.status(400).json({ error });
  }
}
