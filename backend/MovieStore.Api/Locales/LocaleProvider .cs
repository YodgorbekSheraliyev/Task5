using System.Text.Json;

namespace MovieStore.Api.Locales
{
    public class LocaleProvider : ILocaleProvider
    {
        private readonly Dictionary<string, LocaleData> _locales;
        public LocaleProvider(IWebHostEnvironment env)
        {
            var localesFolder = Path.Combine(env.ContentRootPath, "Assets", "locales");
            if (!Directory.Exists(localesFolder))
            {
                throw new DirectoryNotFoundException($"Locales folder not found: {localesFolder}");
            }
            var jsonOptions = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            _locales = new Dictionary<string, LocaleData>(StringComparer.OrdinalIgnoreCase);
            foreach (var path in Directory.GetFiles(localesFolder, "*.json"))
            {
                var json = File.ReadAllText(path);
                var localeData = JsonSerializer.Deserialize<LocaleData>(json, jsonOptions);
                if (localeData is null || string.IsNullOrWhiteSpace(localeData.Code))
                    throw new InvalidOperationException($"Invalid locale file (missing 'code'): {path}");
                _locales[localeData.Code] = localeData;
                if (_locales.Count == 0)
                    throw new InvalidOperationException($"No valid locale files found in: {localesFolder}");
            }

        }
        public IReadOnlyList<LocaleData> GetAvailableLocales()
        {
            return _locales.Values.ToList();
        }

        public LocaleData GetLocale(string code)
        {
            if(_locales.TryGetValue(code, out LocaleData? locale))
            {
                return locale;
            }
            throw new ArgumentException($"Unknown locale code: {code}");
        }
    }
}
