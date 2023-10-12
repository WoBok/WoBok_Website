import { httpRequest } from './HttpRequester.js'

const CLASSNAME_LIST_ROOT = 'list-root';
const CLASSNAME_LIST_FILE = 'list-file';
const CLASSNAME_LIST_FOLDER = 'list-folder';
const CLASSNAME_LIST_FOLDER_TITLE = 'list-folder-title';
const CLASSNAME_LIST_GROUP = 'list-group';



const renderer = {
    image(href, title, text) {
        return `<img src="${markdownPath}/${href}" alt="${text}">`;
    }
}

marked.use({ renderer });

const rootPath = "Markdowns";

var markdownPath = rootPath;

async function GetFileList(path) {
    var url = `/api/FileList/${path}`;
    return await httpRequest.fecthJson(url);
}

async function GetMarkdownText(fileName) {
    var url = `/api/MarkdownLoader/${fileName}`;
    return await httpRequest.fetchText(url);
}

function ParseMarkdown(md) {
    document.getElementById("markdownContent").innerHTML = marked.parse(md);
}

function DisplayMarkdown(fileName) {
    GetMarkdownText(fileName).then(text => ParseMarkdown(text));
}

function BindFileNodeClickEvent(fileNameNode) {
    fileNameNode.addEventListener("click", (event) => {

        event.stopPropagation();

        var path = GetNodePath(fileNameNode);

        markdownPath = `${rootPath}/${path}`;

        var filePath = fileNameNode.title;
        if (path != "") {
            filePath = `${path}*${fileNameNode.title}`
        }
        DisplayMarkdown(filePath);
    });
}

function BindFolderNodeClickEvent(folderNameNode) {
    folderNameNode.addEventListener("click", (event) => {

        event.stopPropagation();

        var pathNameContainer = folderNameNode.getElementsByClassName(CLASSNAME_LIST_GROUP);//隐藏与加载逻辑分离 Todo
        if (pathNameContainer[0]) {
            var display = pathNameContainer[0].style.display;
            if (display == "none") {
                pathNameContainer[0].style.display = "block";
            } else {
                pathNameContainer[0].style.display = "none";
            }
        } else {
            var path = GetNodePath(folderNameNode);
            var folderPath = folderNameNode.title;
            if (path != "") {
                folderPath = `${path}*${folderNameNode.title}`
            }
            GetFileList(folderPath).then(json => DisplayPathNode(json, folderNameNode));
        }
    });
}

function GetNodePath(fileNameNode) {
    var path = "";
    var nodeParent = fileNameNode.parentNode;
    while (nodeParent && nodeParent.title != CLASSNAME_LIST_ROOT) {
        if (nodeParent.title != "")
            path = `${nodeParent.title}*${path}`;
        nodeParent = nodeParent.parentNode;
    }
    if (path.endsWith("*"))
        path = path.slice(0, -1);
    return path;
}

function DisplayFileNode(fileNames, parent) {
    for (let p of fileNames) {
        let liNode = document.createElement("li");
        liNode.className = CLASSNAME_LIST_FILE;
        let fileNameNode = document.createTextNode(p);
        liNode.title = p;
        liNode.appendChild(fileNameNode);

        BindFileNodeClickEvent(liNode);

        parent.appendChild(liNode);
    }
}

function DisplayFolderNode(folderNames, parent) {
    for (let p of folderNames) {
        let liNode = document.createElement("li");
        liNode.className = CLASSNAME_LIST_FOLDER;
        let folderNameNodeContent = document.createTextNode(p);
        let folderNameNode = document.createElement("span");
        folderNameNode.appendChild(folderNameNodeContent);
        folderNameNode.className = CLASSNAME_LIST_FOLDER_TITLE;
        liNode.title = p;
        liNode.appendChild(folderNameNode);

        parent.appendChild(liNode);

        BindFolderNodeClickEvent(liNode);
    }
}

function DisplayPathNode(pathNode, parentNode) {
    var node = document.createElement("div");
    node.className = CLASSNAME_LIST_GROUP;
    parentNode.appendChild(node);
    if (pathNode["files"].length > 0)
        DisplayFileNode(pathNode["files"], node);
    if (pathNode["folders"].length > 0) {
        DisplayFolderNode(pathNode["folders"], node);
    }
}

function DisplayRootPathNode(pathNode) {
    var fileListContent = document.getElementById("fileListContent");
    fileListContent.innerText = "";

    var ulNode = document.createElement("ul");
    fileListContent.appendChild(ulNode);

    var listRootNode = document.createElement("div");
    listRootNode.title = CLASSNAME_LIST_ROOT;
    ulNode.appendChild(listRootNode);

    DisplayPathNode(pathNode, listRootNode);
}

GetFileList("*").then(json => DisplayRootPathNode(json));