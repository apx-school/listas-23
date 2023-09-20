import { cookies } from "next/headers";
import { decodeToken } from "./token";
import { User, getUserById } from "models/users";

export async function getSessionUserTokenData() {
  const cookie = cookies().get("auth_token");
  const token = cookie?.value;
  return decodeToken(token as string);
}

export async function getSessionUser(): Promise<User> {
  const tokenData = await getSessionUserTokenData();
  const user = await getUserById(tokenData?.userId);
  return user;
}
