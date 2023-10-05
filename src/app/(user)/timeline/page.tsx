import { getSessionUser } from "lib/app.next";

export default async function TimelinePage() {
  const sessionTokenData = await getSessionUser();
  console.log(sessionTokenData);

  return (
    <div>
      <h4>Timeline/Newfeed</h4>
      <div>User:{sessionTokenData?._id}</div>
    </div>
  );
}
