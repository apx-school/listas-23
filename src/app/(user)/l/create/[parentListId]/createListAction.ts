"use server";
import { getSessionUser } from "lib/app.next";
import { addItemToList, createList } from "models/lists";

export async function createListAction(parentListId, listData) {
  const user = await getSessionUser();
  const newList = await createList(user._id, {
    title: listData.title,
  });
  addItemToList(parentListId);
  // console.log(parentListId, listData);
}
