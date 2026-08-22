namespace MovieStore.Api.Locales
{
    public interface ILocaleProvider
    {
        IReadOnlyList<LocaleData> GetAvailableLocales();

        LocaleData GetLocale(string code);
    }
}
