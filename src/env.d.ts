
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Define las variables de entorno
interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL: string;
  readonly PUBLIC_SUPABASE_ANON_KEY: string;
}

// Habilita import.meta.env en el código
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Define el tipo de Astro.locals.user
declare namespace App {
  interface Locals {
    user: import('@supabase/supabase-js').User | null;
  }
}