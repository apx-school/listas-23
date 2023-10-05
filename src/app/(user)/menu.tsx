import { User } from "react-feather";
import styles from "./menu.module.scss";
import Link from "next/link";
export function Menu({ userId }) {
  return (
    <div className={styles.root}>
      <Link href={"/" + userId} className={styles.menuOption}>
        <User className={styles.menuOptionIcon} />
        <div className={styles.menuOptionLabel}>Perfil</div>
      </Link>
    </div>
  );
}
