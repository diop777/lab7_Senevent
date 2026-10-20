import { getSupabase } from "./supabaseClient";
import { Evenement, NouvelEvenementInput } from "./types";

// Lire tous les événements
export async function getEvenements(): Promise<Evenement[]> {
  const { data, error } = await getSupabase()
    .from("evenements")
    .select("*, profiles (nom)")
    .order("date_debut", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Evenement[];
}

// Créer un événement
export async function creerEvenement(input: NouvelEvenementInput): Promise<void> {
  const { error } = await getSupabase().from("evenements").insert(input);
  if (error) throw error;
}

// Supprimer un événement
export async function supprimerEvenement(id: number): Promise<void> {
  const { error } = await getSupabase().from("evenements").delete().eq("id", id);
  if (error) throw error;
}
