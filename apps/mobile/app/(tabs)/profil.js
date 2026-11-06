import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { seConnecter, sInscrire, seDeconnecter } from "@senevent/shared";
import { useAuth } from "../../context/AuthContext";

export default function Profil() {
  const { session, chargement } = useAuth();

  // Si la session est encore en cours de chargement
  if (chargement) {
    return (
      <ActivityIndicator
        size="large"
        color="#1a3a5c"
        style={styles.centre}
      />
    );
  }

  // Si connecte : afficher l'email + deconnexion
  if (session) {
    return (
      <View style={styles.container}>
        <Text style={styles.titre}>Mon profil</Text>
        <Text style={styles.email}>{session.user.email}</Text>
        <Pressable
          style={styles.boutonDeco}
          onPress={() => seDeconnecter()}
        >
          <Text style={styles.boutonTexte}>Se deconnecter</Text>
        </Pressable>
      </View>
    );
  }

  // Sinon : le formulaire de connexion / inscription
  return <FormulaireAuth />;
}

function FormulaireAuth() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState(null);
  const [enCours, setEnCours] = useState(false);

  const soumettre = async () => {
    setErreur(null);
    setEnCours(true);
    try {
      if (mode === "signup") {
        await sInscrire(email, motDePasse);
      } else {
        await seConnecter(email, motDePasse);
      }
      // La session se met a jour toute seule via onAuthStateChange
    } catch (e) {
      setErreur(e.message);
    } finally {
      setEnCours(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.titre}>
        {mode === "signup" ? "Creer un compte" : "Se connecter"}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={motDePasse}
        onChangeText={setMotDePasse}
      />
      {erreur && <Text style={styles.erreur}>{erreur}</Text>}
      <Pressable
        style={styles.bouton}
        onPress={soumettre}
        disabled={enCours}
      >
        <Text style={styles.boutonTexte}>
          {enCours
            ? "..."
            : mode === "signup"
            ? "Creer le compte"
            : "Se connecter"}
        </Text>
      </Pressable>
      <Pressable
        onPress={() =>
          setMode(mode === "signup" ? "login" : "signup")
        }
      >
        <Text style={styles.basculer}>
          {mode === "signup"
            ? "Deja un compte ? Se connecter"
            : "Pas de compte ? En creer un"}
        </Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#f0f4f8",
  },
  centre: { marginTop: 40 },
  titre: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a3a5c",
    marginBottom: 20,
    textAlign: "center",
  },
  email: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  bouton: {
    backgroundColor: "#1a3a5c",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 4,
  },
  boutonDeco: {
    backgroundColor: "#ea7d2b",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  boutonTexte: { color: "#fff", fontSize: 16, fontWeight: "600" },
  basculer: {
    color: "#3949ab",
    textAlign: "center",
    marginTop: 16,
  },
  erreur: {
    color: "#a01a1a",
    textAlign: "center",
    marginBottom: 12,
  },
});
