import { httpRequest } from './HttpRequester.js'

const CLASSNAME_LIST_ROOT = 'list-root';
const CLASSNAME_LIST_FILE = 'list-file';
const CLASSNAME_LIST_FOLDER = 'list-folder';
const CLASSNAME_LIST_FOLDER_TITLE = 'list-folder-title';
const CLASSNAME_LIST_GROUP = 'list-group';
const TITLE_LENGTH = 10;

const $markdownContent = document.querySelector("#markdownContent");
const $fileListContent = document.querySelector("#fileListContent");
const $markdownContentTitle = document.querySelector("#markdownContentTitle");
const $img = document.querySelector("img");

const rootPath = "Markdowns";

var markdownPath = rootPath;

var lastSelectedNode;

const renderer = {
    image(href, title, text) {
        return `<img src="${markdownPath}/${href}" alt="${text}">`;
    }
}
//style = "width: auto;" onclick = "
//if (this.style.width != '1000px') {
//    this.style.width = '1000px';
//} else {
//    this.style.width = 'auto';
//}
//"
marked.use({ renderer });

async function getFileList(path) {
    var url = `/api/FileList/${path}`;
    return await httpRequest.fecthJson(url);
}

async function getMarkdownText(fileName) {
    var url = `/api/MarkdownLoader/${fileName}`;
    return await httpRequest.fetchText(url);
}

function parseMarkdown(md) {
    $markdownContent.innerHTML = marked.parse(md);
}

function displayMarkdown(fileName) {
    getMarkdownText(fileName).then(text => parseMarkdown(text));
}

function markSelectedNode(node) {
    node.style.fontWeight = 'bold';
    node.style.borderBottomStyle = 'dashed';
    node.style.borderBottomWidth = '2px';
    if (lastSelectedNode && node != lastSelectedNode) {
        lastSelectedNode.style.fontWeight = 'normal';
        lastSelectedNode.style.borderBottomStyle = 'solid';
        lastSelectedNode.style.borderBottomWidth = '1px';
    }
}

function bindFileNodeClickEvent(fileNameNode) {
    fileNameNode.addEventListener("click", (event) => {

        event.stopPropagation();

        var path = getNodePath(fileNameNode);

        markdownPath = `${rootPath}/${path}`;

        var filePath = fileNameNode.title;
        if (path != "") {
            filePath = `${path}*${fileNameNode.title}`
        }

        $markdownContentTitle.innerHTML = fileNameNode.title;

        markSelectedNode(fileNameNode);
        lastSelectedNode = fileNameNode;

        displayMarkdown(filePath);
    });
}

function bindFolderNodeClickEvent(folderNameNode) {
    folderNameNode.addEventListener("click", (event) => {

        event.stopPropagation();

        var pathNameContainer = folderNameNode.getElementsByClassName(CLASSNAME_LIST_GROUP);
        if (pathNameContainer[0]) {
            var display = pathNameContainer[0].style.display;
            if (display == "none") {
                pathNameContainer[0].style.display = "block";
            } else {
                pathNameContainer[0].style.display = "none";
            }
        } else {
            var path = getNodePath(folderNameNode);
            var folderPath = folderNameNode.title;
            if (path != "") {
                folderPath = `${path}*${folderNameNode.title}`
            }
            getFileList(folderPath).then(json => displayPathNode(json, folderNameNode));
        }
    });
}

function getNodePath(fileNameNode) {
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

function truncateStringWithEllipsis(inputString, maxLength) {
    return inputString.length > maxLength ? inputString.substring(0, maxLength) + "..." : inputString;
}

function displayFileNode(fileNames, parent) {
    for (let p of fileNames) {
        let liNode = document.createElement("li");
        liNode.className = CLASSNAME_LIST_FILE;
        let fileNameNode = document.createTextNode(truncateStringWithEllipsis(p, TITLE_LENGTH));
        liNode.title = p;
        liNode.appendChild(fileNameNode);

        parent.appendChild(liNode);

        bindFileNodeClickEvent(liNode);
    }
}

function displayFolderNode(folderNames, parent) {
    for (let p of folderNames) {
        let liNode = document.createElement("li");
        liNode.className = CLASSNAME_LIST_FOLDER;
        let folderNameNodeContent = document.createTextNode(truncateStringWithEllipsis(p, TITLE_LENGTH));
        let folderNameNode = document.createElement("span");
        folderNameNode.appendChild(folderNameNodeContent);
        folderNameNode.className = CLASSNAME_LIST_FOLDER_TITLE;
        liNode.title = p;
        liNode.appendChild(folderNameNode);

        parent.appendChild(liNode);

        bindFolderNodeClickEvent(liNode);
    }
}

function displayPathNode(pathNode, parentNode) {
    var node = document.createElement("div");
    node.className = CLASSNAME_LIST_GROUP;
    parentNode.appendChild(node);
    if (pathNode["files"].length > 0)
        displayFileNode(pathNode["files"], node);
    if (pathNode["folders"].length > 0) {
        displayFolderNode(pathNode["folders"], node);
    }
}

function displayRootPathNode(pathNode) {
    $fileListContent.innerText = "";

    var ulNode = document.createElement("ul");
    $fileListContent.appendChild(ulNode);

    var listRootNode = document.createElement("div");
    listRootNode.title = CLASSNAME_LIST_ROOT;
    ulNode.appendChild(listRootNode);

    displayPathNode(pathNode, listRootNode);
}

export const reader = {
    displayList: function () {
        getFileList("*").then(json => displayRootPathNode(json));
    }
};