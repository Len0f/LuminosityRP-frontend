import { useState, useEffect } from "react";
import api from "../utils/api";
import styles from "../styles/UsersManager.module.css";

export default function UsersManager() {
  const [users, setUsers] = useState([]);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("modo");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data } = await api.get("/users");
    setUsers(data);
  };

  const notify = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const createUser = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users", {
        username: newUsername,
        password: newPassword,
        role: newRole,
      });
      setNewUsername("");
      setNewPassword("");
      setNewRole("modo");
      fetchUsers();
      notify("✅ Compte créé avec succès !");
    } catch (err) {
      notify("❌ " + (err.response?.data?.message || "Erreur"));
    }
  };

  const deleteUser = async (id) => {
    if (!confirm("Supprimer ce compte ?")) return;
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
      notify("✅ Compte supprimé.");
    } catch (err) {
      notify("❌ " + (err.response?.data?.message || "Erreur"));
    }
  };

  const toggleRole = async (user) => {
    const nextRole = user.role === "admin" ? "modo" : "admin";
    try {
      await api.put(`/users/${user._id}`, { role: nextRole });
      fetchUsers();
    } catch (err) {
      notify("❌ " + (err.response?.data?.message || "Erreur"));
    }
  };

  const displayRole = (role) => {
    if (role === "admin") return "Admin";
    return "Modo";
  };

  return (
    <div className={styles.manager}>
      <h2 className={styles.title}>GESTION DES COMPTES</h2>

      {message && <p className={styles.message}>{message}</p>}

      <form onSubmit={createUser} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="Identifiant"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Mot de passe"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <select
          className={styles.select}
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        >
          <option value="modo">Modo</option>
          <option value="admin">Admin</option>
        </select>
        <button className={styles.addBtn} type="submit">
          + CRÉER
        </button>
      </form>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Identifiant</th>
            <th>Rôle</th>
            <th>Créé le</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>
                <span
                  className={`${styles.role} ${user.role === "admin" ? styles.admin : styles.staff}`}
                >
                  {displayRole(user.role)}
                </span>
              </td>
              <td>{new Date(user.createdAt).toLocaleDateString("fr-FR")}</td>
              <td className={styles.actions}>
                <button
                  className={styles.roleBtn}
                  onClick={() => toggleRole(user)}
                >
                  {user.role === "admin" ? "→ Modo" : "→ Admin"}
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => deleteUser(user._id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
