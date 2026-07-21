import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sInscrire, seConnecter, getSupabase } from "@senevent/shared"; // <-- package partagé
import styles from "./Auth.module.css";

const Auth = () => {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [nom, setNom] = useState("");
  const [erreur, setErreur] = useState(null);
  const [enCours, setEnCours] = useState(false);
  const navigate = useNavigate();

  const soumettre = async (event) => {
    event.preventDefault();
    setErreur(null);
    setEnCours(true);
    try {
      if (mode === "signup") {
        const data = await sInscrire(email, motDePasse); // <-- inscription via package

        // Créer la ligne profile associée
        if (data.user) {
          const { error: e2 } = await getSupabase()
            .from("profiles")
            .insert({ id: data.user.id, nom, role: "PUBLIC" });
          if (e2) throw e2;
        }
      } else {
        await seConnecter(email, motDePasse); // <-- connexion via package
      }
      navigate("/");
    } catch (e) {
      setErreur(e.message);
    } finally {
      setEnCours(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={soumettre}>
      <h2>{mode === "signup" ? "Créer un compte" : "Se connecter"}</h2>

      {mode === "signup" && (
        <label className={styles.champ}>
          Nom d'affichage
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </label>
      )}

      <label className={styles.champ}>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label className={styles.champ}>
        Mot de passe
        <input
          type="password"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          minLength="6"
          required
        />
      </label>

      {erreur && <p className={styles.erreur}>{erreur}</p>}

      <button type="submit" disabled={enCours} className={styles.bouton}>
        {enCours ? "..." : mode === "signup" ? "Créer le compte" : "Se connecter"}
      </button>

      <button
        type="button"
        onClick={() => setMode(mode === "signup" ? "login" : "signup")}
        className={styles.basculer}
      >
        {mode === "signup"
          ? "Déjà un compte ? Se connecter"
          : "Pas encore de compte ? Créer"}
      </button>
    </form>
  );
};

export default Auth;
