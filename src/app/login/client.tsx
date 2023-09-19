"use client";
import { submitHandler } from "./actions";

export function LoginForm() {
  return (
    <form action={submitHandler} style={{ padding: 60 }}>
      <div>
        <div>Email</div>
        <input type="email" name="email" />
      </div>
      <div>
        <div>Code</div>
        <input type="text" name="code" />
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  );
}
