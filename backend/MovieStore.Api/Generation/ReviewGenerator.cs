using MovieStore.Api.Locales;
using MovieStore.Api.Models;
using MovieStore.Api.Rng;

namespace MovieStore.Api.Generation
{
    public class ReviewGenerator
    {
        public List<Review> Generate(ulong seed, long index, LocaleData locale, int count)
        {
            var random = new Random(SeedHelper.GetSeed(seed, index, RngCategory.Reviews));
            var reviews = new List<Review>();

            for (int i = 0; i < count; i++)
            {
                reviews.Add(new Review
                {
                    Text = locale.ReviewPhrases[random.Next(locale.ReviewPhrases.Count)]
                });
            }

            return reviews;
        }
    }
}