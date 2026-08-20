var builder = WebApplication.CreateBuilder(args);

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
