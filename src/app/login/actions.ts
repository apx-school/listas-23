"use server";
import { sendCode, getToken } from "lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function submitHandler(values) {
  const email = values.get("email");
  const code = values.get("code");
  if (email && !code) {
    await sendCode(email);
  } else if (email && code) {
    const token = await getToken(email, code);
    cookies().set("auth_token", token, {
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
    });
    return redirect("/");
  }
}
