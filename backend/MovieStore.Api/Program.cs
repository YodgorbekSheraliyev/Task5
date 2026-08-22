using MovieStore.Api.Generation;
using MovieStore.Api.Locales;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddCors();

builder.Services.AddSingleton<ILocaleProvider, LocaleProvider>();
builder.Services.AddSingleton<MovieGenerator>();
builder.Services.AddSingleton<LikesReviewsCountGenerator>();
builder.Services.AddSingleton<ReviewGenerator>();
builder.Services.AddSingleton<TrailerSpecGenerator>();

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
