using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;

namespace MovieStore.Api.Controllers
{
    [ApiController]
    [Route("api/seed")]
    public class SeedController: ControllerBase
    {
        [HttpGet("random")]
        public IActionResult GenerateRandomSeed()
        {
            Span<byte> bytes = stackalloc byte[8];

            RandomNumberGenerator.Fill(bytes);

            ulong seed = BitConverter.ToUInt64(bytes);

            return Ok(seed);
        }
    }
}
