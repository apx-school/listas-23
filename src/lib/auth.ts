import { generateCode, getAuthByUserId } from "models/auth";
import { getOrCreateUserByEmail, getUserIdByEmail } from "models/users";
import { sendEmail } from "./email";
import { generateToken } from "./token";

export async function sendCode(email: string) {
  const user = await getOrCreateUserByEmail(email);
  const newAuth = await generateCode(user._id);

  const emailRes = await sendEmail({
    from: "marce@ztar.tech",
    to: email,
    subject: "Tu código para ingresar - Listas 23",
    html: `Tu código para ingresar es: ${newAuth.code}`,
  });

  return newAuth;
}

export async function getToken(email: string, code: string): Promise<string> {
  const userId = await getUserIdByEmail(email);
  const newAuth = await getAuthByUserId(userId);
  // TODO Validaciones de fecha de creación
  // y retry
  if (newAuth?.code == code) {
    return generateToken({ userId, email });
  } else {
    throw "Código incorrecto";
  }
}
