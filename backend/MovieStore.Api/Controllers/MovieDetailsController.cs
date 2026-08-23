using Microsoft.AspNetCore.Mvc;
using MovieStore.Api.Dtos;
using MovieStore.Api.Generation;
using MovieStore.Api.Locales;

namespace MovieStore.Api.Controllers
{
    [ApiController]
    [Route("api/movies/{index}/details")]
    public class MovieDetailsController : ControllerBase
    {
        private readonly ILocaleProvider _localeProvider;
        private readonly MovieGenerator _movieGenerator;
        private readonly LikesReviewsCountGenerator _countGenerator;
        private readonly ReviewGenerator _reviewGenerator;
        private readonly TrailerSpecGenerator _trailerSpecGenerator;

        public MovieDetailsController(
            ILocaleProvider localeProvider,
            MovieGenerator movieGenerator,
            LikesReviewsCountGenerator countGenerator,
            ReviewGenerator reviewGenerator,
            TrailerSpecGenerator trailerSpecGenerator)
        {
            _localeProvider = localeProvider;
            _movieGenerator = movieGenerator;
            _countGenerator = countGenerator;
            _reviewGenerator = reviewGenerator;
            _trailerSpecGenerator = trailerSpecGenerator;
        }

        [HttpGet]
        public IActionResult GetDetails(
            long index,
            [FromQuery] ulong seed,
            [FromQuery] string locale,
            [FromQuery] double avgReviews = 0)
        {
            if (index < 1)
                return BadRequest("index must be >= 1");

            if (avgReviews < 0 || avgReviews > 10)
                return BadRequest(
                    "avgReviews must be between 0 and 10");

            LocaleData localeData;

            try
            {
                localeData = _localeProvider.GetLocale(locale);
            }
            catch (KeyNotFoundException)
            {
                return BadRequest(
                    $"Unknown locale: {locale}");
            }

            var movie = _movieGenerator.Generate(
                seed,
                index,
                localeData);

            var reviewCount =
                _countGenerator.GenerateReviewsCount(
                    seed,
                    index,
                    avgReviews);

            var reviews =
                _reviewGenerator.Generate(
                    seed,
                    index,
                    localeData,
                    reviewCount);

            var trailer =
                _trailerSpecGenerator.Generate(
                    seed,
                    index,
                    localeData,
                    movie.Title);

            var result = new MovieDetailsDto
            {
                Reviews = reviews
                    .Select(r => new ReviewDto
                    {
                        Text = r.Text
                    })
                    .ToList(),

                Trailer = new TrailerSpecDto
                {
                    Segments = trailer.Segments
                        .Select(s => new TrailerSegmentDto
                        {
                            Type = s.Type,
                            Text = s.Text,
                            AnimationStyle =
                                s.AnimationStyle,
                            ClipId = s.ClipId,
                            ColorFilter =
                                s.ColorFilter,
                            Zoom = s.Zoom,
                            Speed = s.Speed,
                            TransitionToNext =
                                s.TransitionToNext,
                            Duration = s.Duration
                        })
                        .ToList()
                }
            };

            return Ok(result);
        }
    }
}