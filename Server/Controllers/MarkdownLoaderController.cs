using Microsoft.AspNetCore.Mvc;

namespace WoBok_Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarkdownLoaderController : ControllerBase
    {
        [HttpGet("{fileName}")]
        public string Get(string fileName)
        {
            string? markdownContent;
            try
            {
                markdownContent = System.IO.File.ReadAllText($"D:/WoBokMarkdown/{fileName}.md");
            }
            catch (System.IO.FileNotFoundException)
            {
                return "Not Found!";
            }
            if (markdownContent == null)
                return "empty!";
            return markdownContent;
        }
    }
}