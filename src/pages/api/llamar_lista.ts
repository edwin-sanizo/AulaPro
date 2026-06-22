import type { APIRoute } from 'astro';
import { createClient } from '../../lib/supabase';
import { getLocalDate } from '../../libr/fechas';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  try {
    const formData = await request.formData();
    const teacherAssignmentId = formData.get('teacherAssignmentId')?.toString();

    if (!teacherAssignmentId) {
      return redirect('/seleccion?error=sin-asignacion');
    }

    const supabase = createClient({ request, cookies });
    const hoy = getLocalDate();

    // 1️⃣ Verificar si ya existe sesión para hoy
    const { data: sesionExistente } = await supabase
      .from("v2_attendance_sessions")
      .select("*")
      .eq("teacher_assignment_id", teacherAssignmentId)
      .eq("session_date", hoy)
      .maybeSingle();

    // 2️⃣ Si existe sesión cerrada, mostrar error
    if (sesionExistente?.status === "closed") {
      return redirect('/gestion_v2?id=' + teacherAssignmentId + '&error=sesion-cerrada');
    }

    // 3️⃣ Si existe sesión abierta, usarla
    if (sesionExistente?.status === "open") {
      return redirect(`/escanear_v2?sessionId=${sesionExistente.id}`);
    }

    // 4️⃣ Crear nueva sesión
    const { data: nuevaSesion, error } = await supabase
      .from("v2_attendance_sessions")
      .insert([
        {
          teacher_assignment_id: teacherAssignmentId,
          session_date: hoy,
          status: "open"
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error al crear sesión:', error);
      return redirect('/gestion_v2?id=' + teacherAssignmentId + '&error=crear-sesion');
    }

    // 5️⃣ Redirigir a escanear con el sessionId
    return redirect(`/escanear_v2?sessionId=${nuevaSesion.id}`);
  } catch(error) {
    return new Response('Error interno', { status: 500 });
  }
};
