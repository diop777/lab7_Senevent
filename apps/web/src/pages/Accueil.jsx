import { useState, useEffect } from "react";
import EvenementCarte from "../components/CarteEvenement";
import SearchBar from "../components/SearchBar";
import EtatChargement from "../components/EtatChargement";

const Accueil = ({ evenements, chargement, erreur, onReessayer }) => {
  const [recherche, setRecherche] = useState("");

  const evenementsFiltres = evenements.filter((ev) =>
    ev.titre.toLowerCase().includes(recherche.toLowerCase())
  );

  useEffect(() => {
    document.title = evenementsFiltres.length > 0
      ? `(${evenementsFiltres.length}) SenEvent`
      : "SenEvent";
  }, [evenementsFiltres.length]);

  return (
    <div>
      <h1>SenEvent — Événements à Dakar</h1>
      <EtatChargement chargement={chargement} erreur={erreur} onReessayer={onReessayer} />
      {!chargement && !erreur && (
        <>
          <SearchBar recherche={recherche} onRecherche={setRecherche} />
          <p>{evenementsFiltres.length} événement(s) trouvé(s)</p>
          {evenementsFiltres.length === 0 ? (
            <p>Aucun événement ne correspond.</p>
          ) : (
            evenementsFiltres.map((ev) => (
              <EvenementCarte key={ev.id} ev={ev} afficherDetails={true} />
            ))
          )}
        </>
      )}
    </div>
  );
};

export default Accueil;