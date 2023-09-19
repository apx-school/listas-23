import * as jose from "jose";

export type Token = Partial<{
  userId: string;
  email: string;
  createdAt?: Date;
}>;

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const alg = "HS256";

export async function decodeToken(jwt: string): Promise<Token> {
  const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret);
  return payload as Token;
}

export async function generateToken(payload: Token): Promise<string> {
  payload.createdAt ||= new Date();
  return new jose.SignJWT(payload as any)
    .setProtectedHeader({ alg })
    .sign(secret);
}
