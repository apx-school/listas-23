import { decodeToken } from "lib/token";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookie = cookies().get("auth_token");
  const token = cookie?.value;
  const decodedToken = await decodeToken(token as string);

  return NextResponse.json({ decodedToken });
}
