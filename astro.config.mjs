// // @ts-check
// import { defineConfig } from 'astro/config';
// import netlify from '@astrojs/netlify';
// import react from '@astrojs/react';
// import tailwindcss from '@tailwindcss/vite';

// // https://astro.build/config
// export default defineConfig({
//   output: "server",
//   adapter: netlify(),
//   integrations: [react()],
//   vite: {
//     plugins: [tailwindcss()],
//     optimizeDeps: {
//       exclude: [
//         '@supabase/supabase-js',
//         'jspdf',
//         'jspdf-autotable',
//         'xlsx',
//         'sonner',
//         'html5-qrcode'
//       ],
//       // ✅ Forzar la optimización en cada inicio
//       force: true
//     },
//     ssr: {
//       noExternal: ["html5-qrcode"]
//     },
//     // ✅ Aumentar el tiempo de espera para dependencias grandes
//     server: {
//       watch: {
//         usePolling: true,
//       },
//     },
//   },
//     devToolbar: {
//     enabled: false
//   },
// });

import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: "server",
  adapter: netlify(),
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],

    optimizeDeps: {
      exclude: ['html5-qrcode'],
    },

    ssr: {
      noExternal: ['html5-qrcode']
    }
  },

  devToolbar: {
    enabled: false
  }
});
