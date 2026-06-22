// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
// const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// export const supabase = createClient(
//   supabaseUrl,
//   supabaseKey
// );

// src/lib/supabase.ts (con manejo de errores)
import { createServerClient } from '@supabase/ssr';
import type { AstroCookies } from 'astro';
import type { CookieOptions } from '@supabase/ssr';

export function createClient({
  request,
  cookies,
}: {
  request: Request;
  cookies: AstroCookies;
}) {
  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
  const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        cookies.set(name, value, options);
      },
      remove(name: string, options: CookieOptions) {
        cookies.delete(name, options);
      },
    },
  });
}