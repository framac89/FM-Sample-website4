using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using Microsoft.Extensions.Configuration; 
using System; 
using prj052.Services;
using System.Threading.Tasks; // Aggiunto per coerenza, anche se non strettamente necessario qui

var builder = WebApplication.CreateBuilder(args);

// --- 1. CONFIGURAZIONE CORS ---
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "FrontendCorsPolicy",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// --- 2. CONFIGURAZIONE DEL DATABASE (Entity Framework Core) ---
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("La stringa di connessione 'DefaultConnection' non è stata trovata in appsettings.json.");
}

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseMySql(
        connectionString,
        ServerVersion.AutoDetect(connectionString),
        mySqlOptions => mySqlOptions.EnableRetryOnFailure()
    );
});


// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// --- 3. CONFIGURAZIONE DELLA PIPELINE HTTP ---

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles(); 
app.UseRouting();

app.UseCors("FrontendCorsPolicy"); 

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();