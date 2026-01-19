// app/page.tsx
"use client";

import { useState } from "react";
// Importa i tipi
import { Meal } from "@/types/meal";
// Importa i componenti
import Navbar from "./navbar"; // Assumiamo esista
import MealSearchForm from "@/components/MealSearchForm";
import MealResults from "@/components/MealResults";


export default function MealSearchPage() {
  const [results, setResults] = useState<Meal[]>([]);
  const [message, setMessage] = useState<string>("Inserisci un termine di ricerca per trovare i pasti.");

  // Funzione di ricerca che verrà passata come prop al componente Form
  const handleSearch = async (searchTerm: string) => {
    
    setMessage("Caricamento risultati...");
    setResults([]); 

    if (!searchTerm) {
        setMessage("Per favore, inserisci un termine valido.");
        return;
    }
    
    const postData = { query: searchTerm };

    try {
      const response = await fetch("http://localhost:5274/meal", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData), 
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Errore di risposta HTTP:", response.status, errorText);
        throw new Error(`Errore HTTP: ${response.status}`);
      }

      const data: Meal[] = await response.json(); 
      
      setResults(data);
      setMessage(data.length > 0 ? `Trovati ${data.length} pasti.` : "Nessun risultato trovato.");

    } catch (error) {
      let errorMessage = "Errore sconosciuto";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      console.error("Errore durante la ricerca:", error);
      setMessage(`Errore di connessione o CORS: ${errorMessage}`);
      setResults([]);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-2">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <h1>Pagina Frontend Ricerca Pasti</h1>
          </div>
        </div>
        
        {/* Componente Modulo di Ricerca */}
        <MealSearchForm onSearch={handleSearch} />
        
        {/* Componente Visualizzazione Risultati */}
        <MealResults results={results} message={message} />
        
      </div>
    </>
  );
}