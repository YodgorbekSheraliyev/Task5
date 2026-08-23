using MovieStore.Api.Locales;
using MovieStore.Api.Models;
using MovieStore.Api.Rng;

namespace MovieStore.Api.Generation
{
    public class TrailerSpecGenerator
    {
        private static readonly string[] AnimationStyles =
        {
            "fade",
            "slide",
            "zoom",
            "glitch"
        };

        private static readonly string[] ColorFilters =
        {
            "none",
            "warm",
            "cool",
            "highContrast",
            "desaturated"
        };

        private static readonly string[] Transitions =
        {
            "cut",
            "crossfade",
            "wipe"
        };

        private readonly int _clipPoolSize;

        public TrailerSpecGenerator(IConfiguration configuration)
        {
            _clipPoolSize = configuration.GetValue<int>(
                "TrailerClipPoolSize",
                20);

            if (_clipPoolSize < 1)
            {
                _clipPoolSize = 20;
            }
        }

        public TrailerSpec Generate(
            ulong seed,
            long index,
            LocaleData locale,
            string movieTitle)
        {
            int randomSeed = SeedHelper.GetSeed(
                seed,
                index,
                RngCategory.Trailer);

            var random = new Random(randomSeed);

            var segments = new List<TrailerSegment>();

            // -------------------------------------------------
            // 1. Movie title
            // -------------------------------------------------

            segments.Add(new TrailerSegment
            {
                Type = "title",
                Text = movieTitle,
                AnimationStyle =
                    Pick(random, AnimationStyles),
                Duration = 1.5
            });

            // -------------------------------------------------
            // 2. Localized filler phrase
            // -------------------------------------------------

            if (locale.TrailerFillerPhrases.Count > 0)
            {
                segments.Add(new TrailerSegment
                {
                    Type = "filler",
                    Text = Pick(
                        random,
                        locale.TrailerFillerPhrases),

                    AnimationStyle =
                        Pick(random, AnimationStyles),

                    Duration = 1.0
                });
            }

            // -------------------------------------------------
            // 3. Video clips
            // -------------------------------------------------

            int clipCount = random.Next(2, 4);

            for (int i = 0; i < clipCount; i++)
            {
                segments.Add(new TrailerSegment
                {
                    Type = "clip",

                    ClipId =
                        $"clip_{random.Next(
                            1,
                            _clipPoolSize + 1):D3}",

                    ColorFilter =
                        Pick(random, ColorFilters),

                    Zoom =
                        1.0 + random.NextDouble() * 0.5,

                    Speed =
                        0.8 + random.NextDouble() * 0.7,

                    Duration = 2.0
                });
            }

            // -------------------------------------------------
            // 4. Transitions
            // -------------------------------------------------

            for (int i = 0; i < segments.Count - 1; i++)
            {
                segments[i].TransitionToNext =
                    Pick(random, Transitions);
            }

            // Last segment has no next segment.
            if (segments.Count > 0)
            {
                segments[^1].TransitionToNext = "none";
            }

            return new TrailerSpec
            {
                Segments = segments
            };
        }

        private static T Pick<T>(
            Random random,
            IReadOnlyList<T> items)
        {
            return items[random.Next(items.Count)];
        }
    }
}