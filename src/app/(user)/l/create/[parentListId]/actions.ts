"use server";

import { getSessionUser } from "lib/app.next";
import { addItemToList, createList } from "models/lists";
import { redirect } from "next/navigation";

export async function createListAction(parentListId, listData) {
  const user = await getSessionUser();
  const newList = await createList(user._id, {
    title: listData.title,
  });
  await addItemToList(parentListId, {
    title: listData.title,
    listId: newList._id,
  });

  return redirect("/" + user._id);
}
