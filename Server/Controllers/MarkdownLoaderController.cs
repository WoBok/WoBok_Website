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
            var markdownFilePath = Path.Combine("D:\\WebProjects\\WoBok_Website\\WoBok_Website\\Client\\Markdowns", fileName + ".md");

            if (System.IO.File.Exists(markdownFilePath))
            {
                try
                {
                    return System.IO.File.ReadAllText(markdownFilePath);
                }
                catch (IOException)
                {
                    return "";
                }
            }
            else
            {
                return "";
            }
        }
    }
}