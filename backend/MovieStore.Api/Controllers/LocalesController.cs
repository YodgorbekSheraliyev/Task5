using Microsoft.AspNetCore.Mvc;
using MovieStore.Api.Dtos;
using MovieStore.Api.Locales;

namespace MovieStore.Api.Controllers
{
    [ApiController]
    [Route("api/locales")]
    public class LocalesController : ControllerBase
    {
        private readonly ILocaleProvider _localeProvider;

        public LocalesController(ILocaleProvider localeProvider)
        {
            _localeProvider = localeProvider;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var locales = _localeProvider.GetAvailableLocales()
                .Select(l => new LocaleInfoDto
                {
                    Code = l.Code,
                    DisplayName = l.DisplayName
                });

            return Ok(locales);
        }
    }
}