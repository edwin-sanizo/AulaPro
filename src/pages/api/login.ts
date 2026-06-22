import type { APIRoute } from 'astro';
import { createClient } from '../../lib/supabase';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return redirect('/login?error=faltan-datos');
  }
 
  const supabase = createClient({ request, cookies });
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect(`/login?error=${error.message}`);
  }

  // ✅ Verificar si es profesor
  const { data: profesor } = await supabase
    .from('v2_teachers')
    .select('*')
    .eq('auth_user_id', data.user.id)
    .single();

  // Si NO es profesor, redirigir con error
  if (!profesor) {
    await supabase.auth.signOut(); // Cerrar sesión
    return redirect('/login?error=no-autorizado');
  }
  return redirect('/login?success=true');
};