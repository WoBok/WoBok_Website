using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections;

namespace WoBok_Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileListController : ControllerBase
    {
        [HttpGet]
        public string[] Get()
        {
            var path = "D:\\WebProjects\\WoBok_Website\\WoBok_Website\\Client\\Markdowns";
            var fileNames = Directory.GetFiles(path).Select(fileName => Path.GetFileNameWithoutExtension(fileName));
            return fileNames.ToArray();
        }
        struct Files
        {
            public string[] directoryNames { get; set; }
            public string[] fileNames { get; set; }
        }
        [HttpPost]
        public IActionResult Post()
        {
            KeyValuePair<object, object> a = new KeyValuePair<object, object>(1, new string[] { "1", "2", "3" });
            return Ok(a);
        }
    }
}