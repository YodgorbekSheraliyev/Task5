namespace MovieStore.Api.Rng
{
    public static class RngCategory
    {
        public const int Content = 0;
        public const int Likes = 1;
        public const int Reviews = 2;
        public const int Trailer = 3;
    }

    public static class SeedHelper
    {
        public static int GetSeed(ulong seed, long index, int category)
        {
            unchecked
            {
                ulong combined = seed + (ulong)index * 397 + (ulong)category * 104729;
                return (int)combined;
            }
        }
    }
}
