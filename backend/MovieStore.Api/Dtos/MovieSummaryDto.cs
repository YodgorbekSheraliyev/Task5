namespace MovieStore.Api.Dtos
{
    public class MovieSummaryDto
    {
        public long Index { get; set; }
        public string Title { get; set; } = string.Empty;
        public List<string> Actors { get; set; } = new();
        public int Year { get; set; }
        public string Genre { get; set; } = string.Empty;
        public int Likes { get; set; }
    }
}