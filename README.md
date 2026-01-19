# FM-Sample-website4 - Meal Finder App

Applicazione Full Stack per la ricerca e la visualizzazione di ricette culinarie, sviluppata utilizzando **.NET Core** per il backend e **Next.js** per il frontend.

## 🌟 Funzionalità Principali

- **Ricerca Intelligente (Fallback Strategy):**
  1. Il sistema cerca la ricetta nel **Database Locale**.
  2. Se non trovata, interroga l'API esterna **[TheMealDB](https://www.themealdb.com/)**.
  3. I nuovi risultati validi vengono **salvati automaticamente** nel database locale per le ricerche future.
- **Interfaccia Utente Responsiva:** Visualizzazione a griglia (Cards) realizzata con **Bootstrap 5**.
- **Ottimizzazione Immagini:** Utilizzo del componente `Image` di Next.js configurato per domini esterni.

## 🏗️ Architettura del Progetto

Il repository è diviso in due cartelle principali:

### 1. Backend (`/Backend`)
- **Framework:** ASP.NET Core Web API.
- **ORM:** Entity Framework Core.
- **Logica Chiave:** `MealController.cs` gestisce il flusso di ricerca e salvataggio.
- **Modelli:** `Meal.cs` definisce la struttura dati (compatibile con JSON di TheMealDB) utilizzando Data Annotations e `JsonPropertyName`.

### 2. Frontend (`/Frontend`)
- **Framework:** Next.js (App Router) con TypeScript.
- **Stile:** Bootstrap 5 (CSS importato globalmente, JS gestito tramite `BootstrapClient.tsx`).
- **Componenti:**
  - `MealResults.tsx`: Gestisce la lista dei risultati.
  - `MealCard.tsx`: Visualizza il singolo pasto con immagine, categoria e area.

## 🚀 Guida all'Installazione e Avvio

### Prerequisiti
- .NET SDK (8.0 o superiore consigliato)
- Node.js (LTS)

### Configurazione Backend
1. Naviga nella cartella del backend:
   ```bash
   cd Backend
   ```
2. Assicurati che `appsettings.json` contenga la stringa di connessione al database corretta e la chiave API (se necessaria).
3. Avvia l'API:
   ```bash
   dotnet run
   ```
   *L'API sarà in ascolto sulla porta configurata (es. https://localhost:7xxx).*

### Configurazione Frontend
1. Naviga nella cartella del frontend:
   ```bash
   cd Frontend
   ```
2. Installa le dipendenze:
   ```bash
   npm install
   ```
3. Avvia il server di sviluppo:
   ```bash
   npm run dev
   ```
4. Apri il browser all'indirizzo http://localhost:3000.
