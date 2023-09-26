using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;

namespace WoBok_Website.Controllers
{
    class PathNode
    {
        public string? Name { get; set; }
        public List<PathNode>? Nodes { get; set; }
    }
    [Route("api/[controller]")]
    [ApiController]
    public class FileListController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var path = "D:\\Darwin Vinci\\Learn\\Web\\WoBok_Website\\Client\\Markdowns";
            var pathNode = new PathNode();
            GetPathNodes(path, ref pathNode);
            return Ok(pathNode);

            //var fileNames = Directory.GetFiles(path).Select(fileName => Path.GetFileNameWithoutExtension(fileName));
            //return fileNames.ToArray();
        }
        void GetPathNodes(string path, ref PathNode pathNode)
        {
            pathNode.Nodes = new List<PathNode>();
            var files = Directory.GetFiles(path);
            var folders = Directory.GetDirectories(path);
            foreach (var file in files)
            {
                pathNode.Nodes.Add(new PathNode { Name = Path.GetFileNameWithoutExtension(file) });
            }
            foreach (var folder in folders)
            {
                var folderNode = new PathNode { Name = Path.GetFileName(folder) };
                pathNode.Nodes.Add(folderNode);
                GetPathNodes(folder, ref folderNode);
            }
        }
    }
}