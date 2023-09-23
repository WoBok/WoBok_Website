using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WoBok_Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileListController : ControllerBase
    {
        [HttpGet]
        public string[] Get()
        {
            var path = "D:\\WoBokMarkdown";
            var fileNames = Directory.GetFiles(path).Select(fileName => Path.GetFileNameWithoutExtension(fileName));
            return fileNames.ToArray();
        }
    }
}