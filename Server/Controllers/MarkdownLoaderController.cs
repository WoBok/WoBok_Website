using Microsoft.AspNetCore.Mvc;

namespace WoBok_Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarkdownLoaderController : ControllerBase
    {
        [HttpGet("{fileName}")]
        public IActionResult Get(string fileName)
        {
            fileName = fileName.Replace('*', '\\');
            var markdownFilePath = Path.Combine("D:\\Darwin Vinci\\Learn\\Web\\WoBok_Website\\Client\\Markdowns", fileName + ".md");

            if (System.IO.File.Exists(markdownFilePath))
            {
                try
                {
                    return Ok(System.IO.File.ReadAllText(markdownFilePath));
                }
                catch (IOException)
                {
                    return NotFound();
                }
            }
            else
            {
                return NotFound();
            }
        }
    }
}