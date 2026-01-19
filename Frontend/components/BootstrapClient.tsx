"use client"; // Indica a Next.js di renderizzare questo componente sul client

import { useEffect } from 'react';

export default function BootstrapClient() {
  // useEffect garantisce che il codice venga eseguito solo nel browser (lato client)
  useEffect(() => {
    // Il 'require' dinamico importa il bundle JS di Bootstrap
    // che include tutte le sue dipendenze (come Popper.js)
    require('bootstrap/dist/js/bootstrap.bundle.min.js'); 
  }, []);

  // Il componente non renderizza nulla, serve solo per eseguire l'effetto
  return null;
}
