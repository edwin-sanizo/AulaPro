// import { defineMiddleware } from "astro/middleware";

// export function onRequest (context: any, next: any) {
//     // intercept data from a request
//     // optionally, modify the properties in `locals`
//     context.locals.title = "New title";

//     // return a Response or the result of calling `next()`
//     return next();
// };

// src/middleware.ts (versión con mejor tipado)
import { defineMiddleware } from 'astro:middleware';
import { createClient } from './lib/supabase';

export const onRequest = defineMiddleware(async (context, next) => {
  const supabase = createClient({
    request: context.request,
    cookies: context.cookies,
  });

  const { data: { user } } = await supabase.auth.getUser();
  context.locals.user = user; // Ahora funciona con el env.d.ts

  const publicRoutes = [
    "/login",
    "/api/login",
    "/favicon.ico"
  ];

  const isPublicRoute = publicRoutes.some(route => 
    context.url.pathname.startsWith(route)
  );

  if(!isPublicRoute && !user) {
    return context.redirect("/login");
  }

  if(context.url.pathname === "/login" && user) {
    return context.redirect("/dashboard");
  }

  return next();

  // Proteger rutas
  // const protectedRoutes = ['/dashboard', '/seleccion', '/administracion', '/generar_carnets', '/seleccionar_reportes', '/reportes_v2', '/historial_estudiante'];

  // if (protectedRoutes.some(route => context.url.pathname.startsWith(route))) {
  //   if (!user) {
  //     return context.redirect('/login');
  //   }
  // }

  // Si está autenticado y va a login, redirigir
  // const authRoutes = ['/login'];
  // if (authRoutes.includes(context.url.pathname) && user) {
  //   return context.redirect('/dashboard');
  // }
});