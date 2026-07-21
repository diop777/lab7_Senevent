import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getEvenements, getSupabase } from "@senevent/shared"; // <-- import du package partagé
import Accueil from "./pages/Accueil";
import NouvelEvenement from "./pages/NouvelEvenement";
import Detail from "./pages/Detail";
import Auth from "./pages/Auth";
import NavBar from "./components/NavBar";

const App = () => {
  const [evenements, setEvenements] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [session, setSession] = useState(null);

  // Gestion de la session Supabase
  useEffect(() => {
    getSupabase().auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: subscription } = getSupabase().auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => subscription.subscription.unsubscribe();
  }, []);

  // Charger les événements depuis Supabase
  const charger = async () => {
    setChargement(true);
    setErreur(null);
    try {
      const data = await getEvenements(); // <-- appel partagé
      setEvenements(data);
    } catch (e) {
      setErreur(e.message);
    } finally {
      setChargement(false);
    }
  };

  useEffect(() => {
    charger();
  }, []);

  return (
    <BrowserRouter>
      <NavBar session={session} />
      <Routes>
        <Route
          path="/"
          element={
            <Accueil
              evenements={evenements}
              chargement={chargement}
              erreur={erreur}
              onReessayer={charger}
            />
          }
        />
        <Route
          path="/nouveau"
          element={<NouvelEvenement onAjoutReussi={charger} />}
        />
        <Route
          path="/evenement/:id"
          element={<Detail evenements={evenements} session={session} />}
        />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
