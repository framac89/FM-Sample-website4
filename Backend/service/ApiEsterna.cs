using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using RestSharp;
using System; // Necessario per Console.WriteLine

namespace prj052.Services 
{
    public static class ApiManager
    {
        public static async Task<ROOT?> GetMealAsync(IConfiguration configuration, string meal)
        {
            var client = new RestClient($"https://www.themealdb.com/api/json/v1/1/search.php?s={meal}");
            var request = new RestRequest("", Method.Get);

            Console.WriteLine($"[API] Tentativo chiamata: {client.BuildUri(request)}");
            
            var response = await client.ExecuteAsync<ROOT>(request);

            if (!response.IsSuccessful)
            {
                Console.WriteLine($"[API ERROR] Chiamata fallita. Status: {response.StatusCode}. Errore: {response.ErrorMessage}. Contenuto: {response.Content}");
                return null;
            }
            
            // L'API restituisce un oggetto ROOT
            if (response.Data?.Meals != null && response.Data.Meals.Count > 0)
            {
                Console.WriteLine("[API] Chiamata riuscita. Risultati trovati.");
                return response.Data;
            }
            
            // Questo caso cattura una risposta 200 OK ma con un array 'meals' nullo o vuoto
            Console.WriteLine("[API WARNING] Risposta HTTP OK (200), ma nessun pasto trovato nel JSON (meals: null/[]).");

            return null;
        }
    }
}