import { ItemsList, createList, getListById } from "models/lists";
import { User, getUserById, updateUser } from "models/users";

export async function getUserProfile(
  userId: string
): Promise<[User, ItemsList]> {
  const user = await getUserById(userId);
  let rootList: ItemsList;

  if (user.rootListId) {
    rootList = await getListById(user.rootListId);
  } else {
    const newRootList = await createList(userId);
    user.rootListId = newRootList._id;
    await updateUser(user);
    rootList = newRootList;
  }

  return [user, rootList];
}
