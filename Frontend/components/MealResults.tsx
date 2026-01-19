// components/MealResults.tsx

import React from 'react';
import { Meal } from "@/types/meal";
import MealCard from './MealCard';

// Definisce i tipi per le props
interface MealResultsProps {
  results: Meal[];
  message: string;
}

export default function MealResults({ results, message }: MealResultsProps) {
  const hasResults = results.length > 0;

  return (
    // Zona Risultati
    <div className="row">
      <div className="col-12 bg-success-subtle my-2 p-2 rounded-4">
        <h1>Risultati</h1>
        
        <p className="text-muted">{message}</p>
        
        <div className="row g-4"> {/* g-4 per un po' di spazio tra le colonne */}
          
          {hasResults ? (
            // Mappa i risultati sul componente MealCard
            results.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))
          ) : (
            // Messaggio mostrato quando non ci sono risultati da mappare
            <div className="col-12">
                <p className="text-muted">In attesa di risultati...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}