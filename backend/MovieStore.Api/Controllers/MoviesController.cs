using Microsoft.AspNetCore.Mvc;
using MovieStore.Api.Dtos;
using MovieStore.Api.Generation;
using MovieStore.Api.Locales;

namespace MovieStore.Api.Controllers
{
    [ApiController]
    [Route("api/movies")]
    public class MoviesController : ControllerBase
    {
        private readonly ILocaleProvider _localeProvider;
        private readonly MovieGenerator _movieGenerator;
        private readonly LikesReviewsCountGenerator _countGenerator;

        public MoviesController(
            ILocaleProvider localeProvider,
            MovieGenerator movieGenerator,
            LikesReviewsCountGenerator countGenerator)
        {
            _localeProvider = localeProvider;
            _movieGenerator = movieGenerator;
            _countGenerator = countGenerator;
        }

        [HttpGet]
        public IActionResult GetPage(
            [FromQuery] ulong seed,
            [FromQuery] string locale,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] double avgLikes = 0,
            [FromQuery] double avgReviews = 0)
        {
            if (page < 1) return BadRequest("page must be >= 1");
            if (pageSize < 1 || pageSize > 100) return BadRequest("pageSize must be between 1 and 100");
            if (avgLikes < 0 || avgLikes > 10) return BadRequest("avgLikes must be between 0 and 10");
            if (avgReviews < 0 || avgReviews > 10) return BadRequest("avgReviews must be between 0 and 10");

            LocaleData localeData;
            try
            {
                localeData = _localeProvider.GetLocale(locale);
            }
            catch (KeyNotFoundException)
            {
                return BadRequest($"Unknown locale: {locale}");
            }

            ulong effectiveSeed = seed ^ (ulong)page * 1000003UL;

            var movies = Enumerable.Range(0, pageSize)
                .Select(i =>
                {
                    long index = (long)(page - 1) * pageSize + i + 1;
                    var movie = _movieGenerator.Generate(effectiveSeed, index, localeData);
                    var likes = _countGenerator.GenerateLikesCount(effectiveSeed, index, avgLikes);

                    return new MovieSummaryDto
                    {
                        Index = movie.Index,
                        Title = movie.Title,
                        Actors = movie.Actors,
                        Year = movie.Year,
                        Genre = movie.Genre,
                        Likes = likes
                    };
                });

            return Ok(movies);
        }
    }
}