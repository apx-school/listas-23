import { getSessionUser, getSessionUserTokenData } from "lib/app.next";

export default async function UserPage() {
  const sessionTokenData = await getSessionUser();
  console.log(sessionTokenData);

  return (
    <div>
      <h1>Timeline</h1>
      <div>User:{sessionTokenData._id}</div>
    </div>
  );
}
