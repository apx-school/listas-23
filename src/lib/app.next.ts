import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME, decodeToken } from "./token";
import { User, getUserById } from "models/users";

export async function getSessionUserTokenData() {
  const cookie = cookies().get(AUTH_COOKIE_NAME);
  const token = cookie?.value;
  return decodeToken(token as string);
}

export async function getSessionUser(): Promise<User> {
  const tokenData = await getSessionUserTokenData();
  const user = await getUserById(tokenData?.userId);
  return user;
}
