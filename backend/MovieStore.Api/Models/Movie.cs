namespace MovieStore.Api.Models
{
    public class Movie
    {
        public long Index { get; set; }
        public string Title { get; set; }
        public List<string> Actors { get; set; } = new();
        public int Year { get; set; }
        public string Genre { get; set; }
    }
}
