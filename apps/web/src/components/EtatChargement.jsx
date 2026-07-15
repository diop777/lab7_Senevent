const EtatChargement = ({ chargement, erreur, onReessayer }) => {
  if (chargement) return <p>Chargement...</p>;
  if (erreur) {
    return (
      <div>
        <p>Erreur : {erreur}</p>
        <button onClick={onReessayer}>Réessayer</button>
      </div>
    );
  }
  return null;
};

export default EtatChargement;