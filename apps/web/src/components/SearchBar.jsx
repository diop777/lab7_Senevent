import styles from "./SearchBar.module.css";

const SearchBar = ({ recherche, onRecherche }) => {
  return (
    <input
      type="text"
      className={styles.recherche}
      placeholder="Rechercher un événement..."
      value={recherche}
      onChange={(e) => onRecherche(e.target.value)}
    />
  );
};

export default SearchBar;