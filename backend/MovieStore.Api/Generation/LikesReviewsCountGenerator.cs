using MovieStore.Api.Rng;

namespace MovieStore.Api.Generation
{
    public class LikesReviewsCountGenerator
    {
        public int GenerateLikesCount(ulong seed, long index, double average)
        {
            var random = new Random(SeedHelper.GetSeed(seed, index, RngCategory.Likes));
            return (int)(average + random.NextDouble());
        }

        public int GenerateReviewsCount(ulong seed, long index, double average)
        {
            var random = new Random(SeedHelper.GetSeed(seed, index, RngCategory.Reviews));
            return (int)(average + random.NextDouble());
        }
    }
}