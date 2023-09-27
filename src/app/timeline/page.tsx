import { getSessionUser } from "lib/app.next";

export default async function TimelinePage() {
  const sessionTokenData = await getSessionUser();
  console.log(sessionTokenData);

  return (
    <div>
      <h1>Timeline/Newfeed</h1>
      <div>User:{sessionTokenData?._id}</div>
    </div>
  );
}
