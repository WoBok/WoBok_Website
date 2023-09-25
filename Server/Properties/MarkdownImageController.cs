using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace WoBok_Website.Properties
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarkdownImageController : ControllerBase
    {
        class Image
        {
            public string path;
            public byte[] data;
        }
        [HttpGet("{fileName}")]
        public string GetImage(string fileName)
        {
            //var imagesPath = Path.Combine("D:/WoBokMarkdown/", fileName + "-img");

            //if (Directory.Exists(imagesPath))
            //{
            //    List<Image> list = new List<Image>();
            //    var fileNames = Directory.GetFiles(imagesPath);
            //    foreach (var file in fileNames)
            //    {
            //        var image = new Image() { path = file, data = System.IO.File.ReadAllBytes(file) };
            //        list.Add(image);
            //    }
            //    return Ok(list);
            //}
            //else
            //{
            //    return NotFound(); 
            //}
            //var img = System.IO.File.ReadAllBytes("D:/WoBokMarkdown/" + fileName + "-img" + "/1.png");
            //List<Image> images = new List<Image>();
            //images.Add(new Image() { path = "21321312", data = new byte[] { } });
            //images.Add(new Image() { path = "dfdf", data = new byte[] { } });
            var a = new Image { path = "dfafasfsd", data = new byte[] { } };
            var b = JsonSerializer.Serialize(a);
            Console.WriteLine(b);
            return b;
        }
    }
}