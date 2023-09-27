import { getSessionUser } from "lib/app.next";
import { getUserProfile } from "lib/users";
import Link from "next/link";
import { notFound } from "next/navigation";
import { listify, map, mapValues, tryit } from "radash";

export default async function ProfilePage({ params }) {
  const profileUserId = params.userId;
  const myUser = await getSessionUser();
  const [err, userProfile] = await tryit(getUserProfile)(profileUserId);

  if (err) {
    notFound();
  }
  const [user, rootList] = userProfile;

  const itsMe = myUser?._id === params.userId;
  const emptyRootList = Object.keys(rootList.items).length === 0;

  return (
    <div>
      <h1>Perfil de {params.userId}</h1>
      <div>itsMe: {itsMe ? "si" : "no"}</div>
      <div>
        <h2>Listas de {params.userId}</h2>
        <div>Rootlist: {rootList._id}</div>
        {emptyRootList ? (
          <div>Todavía no tenés listas creadas</div>
        ) : (
          <div>
            {listify(rootList.items, (itemId, val) => {
              return <div key={itemId}>{val.title}</div>;
            })}
          </div>
        )}
        <div>
          <Link href={"/l/create/" + rootList._id}>
            <button>Nueva lista</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Esta ruta debería ser /[username]
