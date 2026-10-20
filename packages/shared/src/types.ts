// Les catégories possibles
export type Categorie =
  | "concert"
  | "expo"
  | "conference"
  | "atelier"
  | "soutenance";

// Un événement tel qu'il vient de Supabase
export interface Evenement {
  id: number;
  titre: string;
  categorie: Categorie;
  lieu_nom: string;
  date_debut: string; // ISO 8601
  prix: number;
  image_url: string | null;
  organisateur_id: string | null;
  created_at: string;
  profiles?: { nom: string } | null; // jointure
}

// Données pour créer un événement
export interface NouvelEvenementInput {
  titre: string;
  categorie: Categorie;
  lieu_nom: string;
  date_debut: string;
  prix: number;
  image_url?: string | null;
  organisateur_id: string;
}

// Profil utilisateur
export interface Profile {
  id: string;
  nom: string;
  telephone: string | null;
  role: "PUBLIC" | "ORGANISATEUR" | "ADMIN";
  created_at: string;
}
