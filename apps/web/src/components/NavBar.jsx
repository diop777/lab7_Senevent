import { NavLink } from "react-router-dom";
import { seDeconnecter } from "@senevent/shared"; // <-- package partagé
import styles from "./NavBar.module.css";

const NavBar = ({ session }) => {
  const lienActif = ({ isActive }) =>
    isActive ? `${styles.lien} ${styles.lienActif}` : styles.lien;

  const handleDeconnexion = async () => {
    try {
      await seDeconnecter(); // <-- appel partagé
    } catch (e) {
      alert("Erreur lors de la déconnexion : " + e.message);
    }
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>SenEvent</div>
      <div className={styles.liens}>
        <NavLink to="/" end className={lienActif}>Accueil</NavLink>
        {session && (
          <NavLink to="/nouveau" className={lienActif}>Nouvel événement</NavLink>
        )}
        {session ? (
          <>
            <span className={styles.email}>{session.user.email}</span>
            <button onClick={handleDeconnexion} className={styles.deconnexion}>
              Se déconnecter
            </button>
          </>
        ) : (
          <NavLink to="/auth" className={lienActif}>Se connecter</NavLink>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
