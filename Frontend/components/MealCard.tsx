// components/MealCard.tsx

import React from 'react';
import Image from "next/image";
import { Meal } from "@/types/meal";

// Definisce i tipi per le props
interface MealCardProps {
  meal: Meal;
}

export default function MealCard({ meal }: MealCardProps) {
  
  return (
    // Ogni pasto è una colonna (card)
    <div key={meal.idMeal} className="col-sm-12 col-md-6 col-lg-4">
      <div className="card shadow-sm h-100"> {/* h-100 per carte di uguale altezza */}
          
        {/* Immagine del Pasto */}
        {meal.strMealThumb && (
          // Next.js Image Component per ottimizzazione
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal ?? "Immagine Pasto"}
            width={300} // Dimensioni fisse per il layout
            height={200}
            style={{ objectFit: 'cover' }}
            className="card-img-top"
          />
        )}

        <div className="card-body">
          <h5 className="card-title">{meal.strMeal}</h5>
          <p className="card-text mb-1">
            <strong>Categoria:</strong> {meal.strCategory ?? 'Non specificata'}
          </p>
          <p className="card-text mb-1">
            <strong>Area:</strong> {meal.strArea ?? 'Generica'}<br></br>
            {meal.strInstructions ?? 'testo'}

          </p>
          <small className="text-muted">ID: {meal.idMeal}</small>
        </div>
      </div>
    </div>
  );
}