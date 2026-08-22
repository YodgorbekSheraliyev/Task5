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
            var titleRng = RandomGenerator.ForRecord(seed, index, RngStream.Title);
            var actorRng = RandomGenerator.ForRecord(seed, index, RngStream.Actors);
            var yearRng = RandomGenerator.ForRecord(seed, index, RngStream.Year);
            var genreRng = RandomGenerator.ForRecord(seed, index, RngStream.Genre);

            var title = GenerateTitle(titleRng, locale);
            var actors = GenerateActors(actorRng, locale);
            var year = yearRng.NextInt(1980, 2027);
            var genre = genreRng.Pick(locale.Genres);

            return new Movie
            {
                Index = index,
                Title = title,
                Actors = actors,
                Year = year,
                Genre = genre
            };
        }

        private string GenerateTitle(RandomGenerator rng, LocaleData locale)
        {
            var adjective = rng.Pick(locale.TitleAdjectives);
            var noun = rng.Pick(locale.TitleNouns);
            return $"{adjective} {noun}";
        }

        private List<string> GenerateActors(RandomGenerator rng, LocaleData locale)
        {
            var actors = new List<string>(ActorCount);

            for (int i = 0; i < ActorCount; i++)
            {
                var firstName = rng.Pick(locale.FirstNames);
                var lastName = rng.Pick(locale.LastNames);
                actors.Add($"{firstName} {lastName}");
            }

            return actors;
        }
    }
}
