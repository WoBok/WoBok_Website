using Microsoft.AspNetCore.Mvc;

namespace WoBok_Website.Properties
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarkdownImageController : ControllerBase
    {
        class Image
        {
            public string? path { get; set; }
            public byte[]? data { get; set; }
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
                    var image = new Image() { path = file, data = System.IO.File.ReadAllBytes(file) };
                    list.Add(image);
                }
                return Ok(list);
            }
            else
            {
                return NotFound();
            }
        }
        //创建一个Person类，用于测试
        public class Person
        {
            public string? Name { get; set; }
            public int Age { get; set; }
        }
    }
}