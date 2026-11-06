import {
  createClient,
  SupabaseClient,
  SupabaseClientOptions,
} from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function initSupabase(
  url: string,
  anonKey: string,
  options?: SupabaseClientOptions<"public">
): SupabaseClient {
  if (!client) {
    client = createClient(url, anonKey, options);
  }
  return client;
}

// getSupabase() reste inchange
export function getSupabase(): SupabaseClient {
  if (!client) {
    throw new Error(
      "Supabase non initialisé. Appelez initSupabase(url, key) au démarrage."
    );
  }
  return client;
}
