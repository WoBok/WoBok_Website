using Microsoft.AspNetCore.Mvc;

namespace WoBok_Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarkdownImageController : ControllerBase
    {
        class Image
        {
            public string? Path { get; set; }
            public byte[]? Data { get; set; }
        }
        [HttpGet("{fileName}")]
        public IActionResult GetImage(string fileName)
        {
            var imagesPath = Path.Combine("D:/WoBokMarkdown/", fileName + "-img");

            if (Directory.Exists(imagesPath))
            {
                List<Image> list = new List<Image>();
                var fileNames = Directory.GetFiles(imagesPath);
                foreach (var file in fileNames)
                {
                    var image = new Image() { Path = file, Data = System.IO.File.ReadAllBytes(file) };
                    list.Add(image);
                }
                return Ok(list);
            }
            else
            {
                return NotFound();
            }
        }
    }
}