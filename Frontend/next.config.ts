// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  // 🛠️ CONFIGURAZIONE AGGIUNTA PER LE IMMAGINI ESTERNE 🛠️
  images: {
    // remotePatterns permette a Next.js di caricare e ottimizzare immagini da domini specifici.
    remotePatterns: [
      {
        // L'API TheMealDB utilizza sia HTTPS che, a volte, HTTP per le immagini.
        protocol: 'https',
        hostname: 'www.themealdb.com',
        port: '',
        pathname: '/images/media/meals/**',
      },
      {
        protocol: 'http',
        hostname: 'www.themealdb.com',
        port: '',
        pathname: '/images/media/meals/**',
      },
    ],
  },
};

export default nextConfig;