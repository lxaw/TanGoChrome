console.log('in content script');
var body_text_raw = document.body.innerText;

function isKana(ch){
    // first check is for hira, second is kata
    return (ch >= "\u3040" && ch <= "\u309f") || 
    (ch >= "\u30a0" && ch <= "\u30ff")
}
function isKanji(ch){
    return (ch >= "\u4e00" && ch <= "\u9faf") ||
	(ch >= "\u3400" && ch <= "\u4dbf");
}

function isJChar(ch){
    // based on the unicode chart from
    // https://www.darrenlester.com/blog/recognising-japanese-characters-with-javascript
    if(isKanji(ch) || isKana(ch)){
        return true;
    }    
}

function jStrBuilder(str){
    // builds one big string that is only japanese chars
    // note this could potentially lead to false positives
    var jChars = [];
    [...str].forEach(c =>{
        if(isJChar(c)){
            jChars.push(c);
        }
    });
    return jChars.join("");
}
function jKanjiArrBuilder(aStr){
    // returns an array of all kanji found in aStr
    var kanji_arr = [];
    [...aStr].forEach(c =>{
        if(isKanji(c)){
            kanji_arr.push(c);
        }
    });
    return kanji_arr;
}

var stripped_jChars = jStrBuilder(body_text_raw);
var stripped_kanji = jKanjiArrBuilder(body_text_raw);
// send to background script
var payload = [stripped_jChars,stripped_kanji];

chrome.runtime.sendMessage(payload);

