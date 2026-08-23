using Bogus;
using MovieStore.Api.Locales;
using MovieStore.Api.Models;
using MovieStore.Api.Rng;

namespace MovieStore.Api.Generation
{
    public class MovieGenerator
    {
        private const int ActorCount = 3;

        public Movie Generate(
            ulong seed,
            long index,
            LocaleData locale)
        {
            var faker = new Faker(locale.Code);

            var fakerSeed = SeedHelper.GetSeed(
                seed,
                index,
                RngCategory.Content
            );

            faker.Random = new Randomizer(
                (int)(fakerSeed % int.MaxValue)
            );

            var adjective = faker.PickRandom(
                locale.TitleAdjectives
            );

            var noun = faker.PickRandom(
                locale.TitleNouns
            );

            var title = $"{adjective} {noun}";

            var actors = Enumerable
                .Range(0, ActorCount)
                .Select(_ =>
                {
                    var firstName = faker.Name.FirstName();

                    var lastName = faker.Name.LastName();

                    return $"{firstName} {lastName}";
                })
                .ToList();

            var year = faker.Random.Int(
                1980,
                2026
            );

            var genre = faker.PickRandom(
                locale.Genres
            );

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