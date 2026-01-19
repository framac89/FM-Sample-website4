// components/MealSearchForm.tsx

import React from "react";

// Definisce i tipi per le props
interface MealSearchFormProps {
  onSearch: (searchTerm: string) => void;
}

export default function MealSearchForm({ onSearch }: MealSearchFormProps) {
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    
    const formData = new FormData(event.currentTarget);
    const searchTerm = formData.get('query') as string;
    
    // Chiama la funzione di ricerca passata dal componente padre
    onSearch(searchTerm.trim());
  };

  return (
    <div className="row">
      <div className="col-12 bg-warning my-2 p-2 rounded-4">
        <h2 className="text-center">
          Ricerca Pasti
        </h2>
        <p className="my-2 mx-4">Cosa devo cercare</p>
        <form
          className="d-flex"
          role="search"
          onSubmit={handleSubmit}
        >
          <input
            name="query"
            className="form-control mx-4 my-2"
            type="search"
            placeholder="Inserisci qui"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Cerca!
          </button>
        </form>
      </div>
    </div>
  );
}