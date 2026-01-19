# Backend - Meal Finder API

Questo progetto è una **Web API** sviluppata in **ASP.NET Core** che funge da backend per l'applicazione Meal Finder. Gestisce la logica di ricerca delle ricette, l'interazione con il database locale e l'integrazione con l'API esterna di terze parti.

## 🛠️ Tecnologie Utilizzate

- **Framework:** .NET 8 (ASP.NET Core Web API)
- **Database:** SQL Server (o altro provider configurato in EF Core)
- **ORM:** Entity Framework Core
- **Serializzazione:** System.Text.Json

## ⚙️ Funzionalità Chiave

Il backend implementa una logica di **Caching/Fallback** intelligente nel `MealController`:

1. **Ricerca Locale:** Riceve una query di ricerca e controlla prima se esistono ricette corrispondenti nel database locale.
2. **Fallback API Esterna:** Se il database locale non restituisce risultati, il backend interroga l'API pubblica *TheMealDB*.
3. **Persistenza Automatica:** I risultati validi ottenuti dall'API esterna vengono salvati automaticamente nel database locale per velocizzare le ricerche future.

## 🚀 Istruzioni per l'Avvio

### Prerequisiti
- .NET SDK installato.
- Un database configurato (la stringa di connessione deve essere impostata in `appsettings.json`).

### Configurazione

Assicurati che il file `appsettings.json` contenga la stringa di connessione corretta per il tuo database:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=...;Database=...;Trusted_Connection=True;..."
  },
  "ApiSettings": {
    "BaseUrl": "https://www.themealdb.com/api/json/v1/1/"
  }
}
```

### Esecuzione

Dalla cartella `Backend`, esegui i seguenti comandi:

```bash
# Ripristina le dipendenze
dotnet restore

# Avvia l'applicazione
dotnet run
```

L'API sarà accessibile tipicamente su `https://localhost:7xxx` o `http://localhost:5xxx`.

## 📡 API Endpoints

### Ricerca Ricette

- **URL:** `/Meal`
- **Metodo:** `POST`
- **Body (JSON):**
  ```json
  {
    "query": "pasta"
  }
  ```
- **Risposta:** Restituisce una lista di oggetti `Meal` (JSON).
