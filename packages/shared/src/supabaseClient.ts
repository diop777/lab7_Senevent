import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

// Initialise le client une seule fois
export function initSupabase(url: string, anonKey: string): SupabaseClient {
  if (!client) {
    client = createClient(url, anonKey);
  }
  return client;
}

// Récupère le client déjà initialisé
export function getSupabase(): SupabaseClient {
  if (!client) {
    throw new Error(
      "Supabase non initialisé. Appelez initSupabase(url, key) au démarrage."
    );
  }
  return client;
}
