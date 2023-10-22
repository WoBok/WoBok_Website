import { httpRequest } from './HttpRequester.js'

const CLASSNAME_ONE_CONTENT = 'one-content';
const CLASSNAME_ONE_IMG = 'one-img';
const CLASSNAME_ONE_IMGTITLE = 'one-img-title';
const CLASSNAME_ONE_TEXT = 'one-text';
const CLASSNAME_ONE_TEXTTITLE = 'one-text-title';

const $markdownContent = document.querySelector("#markdownContent");

async function getTodayId() {
    var url = 'http://v3.wufazhuce.com:8000/api/onelist/idlist';
    var ids = await httpRequest.fecthJson(url);
    return ids['data'][0];
}

async function getFullData() {
    var id = await getTodayId();
    var url = `http://v3.wufazhuce.com:8000/api/onelist/${id}/0`;
    return await httpRequest.fecthJson(url);
}

async function getTextAndImageData() {
    var fullData = await getFullData();
    var text = fullData['data']['content_list'][0]['forward'];
    var textInfo = fullData['data']['content_list'][0]['words_info'];
    var imgUrl = fullData['data']['content_list'][0]['img_url'];
    var imgTitle = fullData['data']['content_list'][0]['title'];
    var imgInfo = fullData['data']['content_list'][0]['pic_info'];
    var data = {
        text: text,
        textInfo: textInfo,
        imgUrl: imgUrl,
        imgTitle: imgTitle,
        imgInfo: imgInfo,
    }
    return data;
}

async function displayTextAndImage() {
    if ($markdownContent.innerHTML=="") {
        var data = await getTextAndImageData();

        var contentDiv = document.createElement('div');
        var img = document.createElement('img');
        var imgTitle = document.createElement('span');
        var text = document.createElement('span');
        var textTitle = document.createElement('span');

        contentDiv.className = CLASSNAME_ONE_CONTENT;
        img.className = CLASSNAME_ONE_IMG;
        imgTitle.className = CLASSNAME_ONE_IMGTITLE;
        text.className = CLASSNAME_ONE_TEXT;
        textTitle.className = CLASSNAME_ONE_TEXTTITLE;

        img.src = data['imgUrl'];
        imgTitle.innerHTML = `${data['imgTitle']}|${data['imgInfo']}`;
        text.innerHTML = data['text'];
        textTitle.innerHTML = data['textInfo'];

        $markdownContent.appendChild(contentDiv);
        contentDiv.appendChild(img);
        contentDiv.appendChild(imgTitle);
        contentDiv.appendChild(text);
        contentDiv.appendChild(textTitle);
    }
}

export const one = {
    displayOne: displayTextAndImage
};