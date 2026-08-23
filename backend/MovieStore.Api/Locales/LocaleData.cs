namespace MovieStore.Api.Locales
{
    public class LocaleData
    {
        public string Code { get; set; } = string.Empty;
        public string DisplayName { get; set; } = string.Empty;
        public List<string> TitleAdjectives { get; set; } = new();
        public List<string> TitleNouns { get; set; } = new();
        public List<string> Genres { get; set; } = new();
        public List<string> ReviewPhrases { get; set; } = new();
        public List<string> TrailerFillerPhrases { get; set; } = new();
    }
}