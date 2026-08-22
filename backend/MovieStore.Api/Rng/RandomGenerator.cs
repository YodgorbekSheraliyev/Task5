namespace MovieStore.Api.Rng
{
    public enum RngStream
    {
        Title = 1,
        Actors = 2,
        Year = 3,
        Genre = 4,
        Likes = 5,
        Reviews = 6,
        Trailer = 7
    }
    public sealed class RandomGenerator
    {
        private readonly Random _random;

        public RandomGenerator(ulong seed)
        {
            int seed32 = unchecked((int)seed);
            _random = new Random(seed32);
        }

        public double NextDouble() => _random.NextDouble();

        public int NextInt(int minInclusive, int maxExclusive) => _random.Next(minInclusive, maxExclusive);

        public T Pick<T>(IReadOnlyList<T> items)
        {
            if (items.Count == 0)
                throw new ArgumentException("Cannot pick from an empty list", nameof(items));

            return items[_random.Next(items.Count)];
        }
        public static ulong Combine(ulong baseSeed, long number)
        {
            const ulong multiplier = 6364136223846793005UL;
            const ulong addend = 1442695040888963407UL;

            unchecked
            {
                ulong mixedNumber = (ulong)number * multiplier + addend;
                return baseSeed ^ mixedNumber;
            }
        }

        public static RandomGenerator ForRecord(ulong baseSeed, long recordIndex, RngStream stream)
        {
            ulong recordSeed = Combine(baseSeed, recordIndex);
            ulong streamSeed = Combine(recordSeed, (long)stream);
            return new RandomGenerator(streamSeed);
        }
    }
}
