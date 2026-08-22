using MovieStore.Api.Locales;
using MovieStore.Api.Models;
using MovieStore.Api.Rng;

namespace MovieStore.Api.Generation
{
    public class TrailerSpecGenerator
    {
        private static readonly string[] AnimationStyles = { "fade", "slide", "zoom", "glitch" };
        private static readonly string[] ColorFilters = { "none", "warm", "cool", "highContrast", "desaturated" };
        private static readonly string[] Transitions = { "cut", "crossfade", "wipe" };

        private readonly int _clipPoolSize;

        public TrailerSpecGenerator(IConfiguration configuration)
        {
            _clipPoolSize = configuration.GetValue<int>("TrailerClipPoolSize", 20);
        }

        public TrailerSpec Generate(ulong seed, long index, LocaleData locale, string movieTitle)
        {
            var random = new Random(SeedHelper.GetSeed(seed, index, RngCategory.Trailer));
            var segments = new List<TrailerSegment>();

            segments.Add(new TrailerSegment
            {
                Type = "title",
                Text = movieTitle,
                AnimationStyle = AnimationStyles[random.Next(AnimationStyles.Length)]
            });

            segments.Add(new TrailerSegment
            {
                Type = "filler",
                Text = locale.TrailerFillerPhrases[random.Next(locale.TrailerFillerPhrases.Count)],
                AnimationStyle = AnimationStyles[random.Next(AnimationStyles.Length)]
            });

            int clipCount = random.Next(2, 4);
            for (int i = 0; i < clipCount; i++)
            {
                segments.Add(new TrailerSegment
                {
                    Type = "clip",
                    ClipId = $"clip_{random.Next(1, _clipPoolSize + 1):D3}",
                    ColorFilter = ColorFilters[random.Next(ColorFilters.Length)],
                    Zoom = 1.0 + random.NextDouble() * 0.5,
                    Speed = 0.8 + random.NextDouble() * 0.7
                });
            }

            for (int i = 0; i < segments.Count - 1; i++)
            {
                segments[i].TransitionToNext = Transitions[random.Next(Transitions.Length)];
            }

            return new TrailerSpec { Segments = segments };
        }
    }
}