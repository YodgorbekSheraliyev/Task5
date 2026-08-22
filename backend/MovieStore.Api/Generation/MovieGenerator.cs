using MovieStore.Api.Locales;
using MovieStore.Api.Models;
using MovieStore.Api.Rng;

namespace MovieStore.Api.Generation
{
    public class MovieGenerator
    {
        private const int ActorCount = 3;

        public Movie Generate(ulong seed, long index, LocaleData locale)
        {
            var random = new Random(SeedHelper.GetSeed(seed, index, RngCategory.Content));

            var adjective = locale.TitleAdjectives[random.Next(locale.TitleAdjectives.Count)];
            var noun = locale.TitleNouns[random.Next(locale.TitleNouns.Count)];
            var title = $"{adjective} {noun}";

            var actors = new List<string>();
            for (int i = 0; i < ActorCount; i++)
            {
                var firstName = locale.FirstNames[random.Next(locale.FirstNames.Count)];
                var lastName = locale.LastNames[random.Next(locale.LastNames.Count)];
                actors.Add($"{firstName} {lastName}");
            }

            var year = random.Next(1980, 2027);
            var genre = locale.Genres[random.Next(locale.Genres.Count)];

            return new Movie
            {
                Index = index,
                Title = title,
                Actors = actors,
                Year = year,
                Genre = genre
            };
        }
    }
}
