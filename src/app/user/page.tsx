import { getSessionUser, getSessionUserTokenData } from "lib/app.next";

export default async function UserPage() {
  const sessionTokenData = await getSessionUser();
  console.log(sessionTokenData);

  return (
    <div>
      <h1>{sessionTokenData?.email}</h1>
    </div>
  );
}
