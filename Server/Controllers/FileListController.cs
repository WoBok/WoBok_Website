using Microsoft.AspNetCore.Mvc;

namespace WoBok_Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileListController : ControllerBase
    {
        [HttpGet("{subPath}")]
        public IActionResult Get(string subPath)
        {
            const string rootPath = "D:\\Darwin Vinci\\Learn\\Web\\WoBok_Website\\Client\\Markdowns";
            var path = subPath == "*" ? rootPath : Path.Combine(rootPath, subPath);
            if (!Directory.Exists(path))
            {
                return NotFound();
            }
            var pathNode = new
            {
                files = Directory.GetFiles(path).Select(fileName => Path.GetFileNameWithoutExtension(fileName)),
                folders = Directory.GetDirectories(path).Select(folderName => Path.GetFileName(folderName)).Where(folderName => folderName != "@image")
            };
            return Ok(pathNode);
        }
    }
}