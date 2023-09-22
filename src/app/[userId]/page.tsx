import { getSessionUser, getSessionUserTokenData } from "lib/app.next";
import { getListsCreatedBy } from "models/lists";
import { getUserById } from "models/users";
import { notFound } from "next/navigation";

export default async function ProfilePage({ params }) {
  const profileUserId = params.userId;
  const [user, profileUser, userLists] = await Promise.all([
    getSessionUser(),
    getUserById(profileUserId),
    getListsCreatedBy(profileUserId),
  ]);
  if (!profileUser) {
    notFound();
  }

  const itsMe = user?._id === params.userId;
  console.log(userLists);

  return (
    <div>
      <h1>Perfil de {params.userId}</h1>
      <div>itsMe: {itsMe ? "si" : "no"}</div>
      <div>
        {userLists.map((l) => (
          <div key={l._id}>{l.title}</div>
        ))}
      </div>
    </div>
  );
}
