using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using prj052.Services;
using System; // Necessario per tipi base e Console.WriteLine

namespace prj052.Controllers;

[Route("[controller]")]
[ApiController]
public class MealController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;

    // DTO per ricevere la query di ricerca
    public class SearchQuery
    {
        public string? query { get; set; }
    }

    public MealController(ApplicationDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost]
    public async Task<IActionResult> Search([FromBody] SearchQuery input)
    {
        if (string.IsNullOrWhiteSpace(input.query))
        {
            Console.WriteLine("[DEBUG] Query vuota o nulla ricevuta.");
            return Ok(new List<MEAL>());
        }

        var searchTerm = input.query.ToLower().Trim();
        Console.WriteLine($"[DEBUG] Ricerca iniziata per: {searchTerm}");

        List<MEAL> finalResults = new List<MEAL>();

        // 1. **RICERCA NEL DATABASE LOCALE**
        try
        {
            var mealsFromDb = await _context.Meals
                .Where(m =>
                    m.StrMeal != null && m.StrMeal.ToLower().Contains(searchTerm)
                )
                .OrderBy(m => m.StrMeal) 
                .Take(50)
                .ToListAsync();

            finalResults.AddRange(mealsFromDb);
            Console.WriteLine($"[DEBUG] Risultati trovati nel DB: {finalResults.Count}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[ERROR] Errore durante la ricerca nel DB: {ex.Message}. Continuo con il fallback API.");
            // Non terminare qui, prova il fallback!
        }


        // 2. **FALLBACK: RICERCA NELL'API ESTERNA SE IL DB NON HA RISULTATI**

        if (!finalResults.Any()) 
        {
            Console.WriteLine("[DEBUG] *** DB VUOTO. ESEGUO FALLBACK API ESTERNA ***");

            ROOT? mealsFromApi = await ApiManager.GetMealAsync(_configuration, searchTerm);

            if (mealsFromApi?.Meals != null && mealsFromApi.Meals.Any())
            {
                var newMeals = mealsFromApi.Meals;
                Console.WriteLine($"[DEBUG] API Esterna: Trovati {newMeals.Count} pasti.");

                // 3. **SALVA I NUOVI RISULTATI NEL DB LOCALE**
                
                var newMealsToSave = newMeals
                    .Where(apiMeal =>
                        !string.IsNullOrEmpty(apiMeal.IdMeal) && 
                        !_context.Meals.Any(dbMeal => dbMeal.IdMeal == apiMeal.IdMeal) 
                    )
                    .ToList();

                if (newMealsToSave.Any())
                {
                    Console.WriteLine($"[DEBUG] Tentativo di salvare nel DB {newMealsToSave.Count} nuovi pasti.");
                    _context.Meals.AddRange(newMealsToSave);
                    await _context.SaveChangesAsync();
                }

                finalResults.AddRange(newMeals);
            }
            else
            {
                Console.WriteLine("[DEBUG] API Esterna non ha restituito pasti validi, fallita, o non ha trovato risultati.");
            }
        }

        // 4. **RESTITUISCI I RISULTATI**
        Console.WriteLine($"[DEBUG] Risultati totali finali da restituire: {finalResults.DistinctBy(m => m.IdMeal).Count()}");
        return Ok(finalResults.DistinctBy(m => m.IdMeal).ToList());
    }
}