import { AUTH_COOKIE_NAME, decodeToken, generateToken } from "lib/token";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // const cookie = cookies().get(AUTH_COOKIE_NAME);
  // const token = cookie?.value;

  // const decodedToken = await decodeToken(token as string);
  const token = await generateToken({ user: 1234 } as any);
  const decoded = await decodeToken(token);

  return NextResponse.json({ token, decoded });
}
