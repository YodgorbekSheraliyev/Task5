using MovieStore.Api.Locales;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<ILocaleProvider, LocaleProvider>();

builder.Services.AddControllers();
builder.Services.AddCors();

var app = builder.Build();

app.UseCors(options =>
{
    options.AllowAnyHeader();
    options.AllowAnyMethod();
    options.AllowAnyOrigin();
});

app.MapControllers();
app.MapGet("health", () => "healthy");
app.Run();
