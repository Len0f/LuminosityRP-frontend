import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import RulesEditor from "../components/RulesEditor";
import UsersManager from "../components/UsersManager";
import styles from "../styles/Admin.module.css";

export default function Admin() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading]);

  if (loading) return <div className={styles.loading}>Chargement...</div>;
  if (!user) return null;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>PANEL STAFF</h1>
        <a href="/" className={styles.backLink}>
          ← Règlement
        </a>
        <div className={styles.headerRight}>
          <span className={styles.username}>{user.username}</span>
          <span className={styles.role}>{user.role}</span>
          <button
            className={styles.logout}
            onClick={() => {
              logout();
              router.push("/reglement");
            }}
          >
            Déconnexion
          </button>
        </div>
      </header>
      <main className={styles.main}>
        <RulesEditor />
        {user.role === "admin" && <UsersManager />}
      </main>
    </div>
  );
}
