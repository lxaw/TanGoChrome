// Written (with love) by Lex Whalen

// In content.js, we send all of the Japanese html to background.js.
// background.js processes it, we just load it!

// ************ Background Pack ************
var _bgPage = chrome.extension.getBackgroundPage();
var _bgData = _bgPage.data;

// ************ Interacting with popup.html ************

// btns
var _words__topBtn = document.getElementById('words__topBtn');

// displaying the data in html

// words
var _html_display__words = document.getElementById("display__foundWords");
var _html_display__mostCommonWord = document.getElementById("display__mostCommonWord");
var _html_display__leastCommonWord = document.getElementById("display__leastCommonWord");

// kanji
var _html_display__kanji = document.getElementById("display__foundKanji");
var _html_display__mostCommonKanji = document.getElementById("display__mostCommonKanji");
var _html_display__leastCommonKanji = document.getElementById("display__leastCommonKanji");

// btns
var _btn__refresh = document.getElementById("btn__refresh");


// ************ Static display data *************
var _defaultRet = "None";
// display the words
function showWords(){
    // populates the words display
    if(_bgData.getSortedWordArr() != undefined ||
        _bgData.getSortedWordArr() != ""){
        _html_display__words.innerText = _bgData.wordArrToStr();
    }
    else{
        _html_display__words.innerText = _defaultRet;
    }
}
// display the most common/least common word / kanji
function showMostCommonWord(){
    // populates the most common word on the html
    if(_bgData.getMostCommonWord() != undefined){
        _html_display__mostCommonWord.innerText = _bgData.getMostCommonWord();
    }
    else{
        _html_display__mostCommonWord.innerText = _defaultRet;
    }
}
function showLeastCommonWord(){
    // populates the least common word on the html
    if(_bgData.getLeastCommonWord() != undefined){
        _html_display__leastCommonWord.innerText = _bgData.getLeastCommonWord();
    }
    else{
        _html_display__leastCommonWord.innerText = _defaultRet;
    }
}
// display the kanji
function showKanji(){
    // populates the kanji display
    if(_bgData.getSortedKanjiArr() != undefined ||
        _bgData.getSortedKanjiArr() != ""){
        _html_display__kanji.innerText = _bgData.kanjiArrToStr();
    }
    else{
        _html_display__kanji.innerText = _defaultRet;
    }
}
function showMostCommonKanji(){
    // populates the most common kanji on the html
    if(_bgData.getMostCommonKanji() != undefined){
        _html_display__mostCommonKanji.innerText = _bgData.getMostCommonKanji();
    }
    else{
        _html_display__mostCommonKanji.innerText = _defaultRet;
    }
}
function showLeastCommonKanji(){
    // populates the least common kanji on the html
    if(_bgData.getLeastCommonKanji() != undefined){
        _html_display__leastCommonKanji.innerText = _bgData.getLeastCommonKanji();
    }
    else{
        _html_display__leastCommonKanji.innerText = _defaultRet;
    }
}

// main app
function initMainApp(){
    // words
    showWords();
    showMostCommonWord();
    showLeastCommonWord();
    // kanji
    showKanji();
    showMostCommonKanji();
    showLeastCommonKanji();
}

initMainApp();

// ************ btns ************* 
// functions
function refreshBtnFunc(){
    chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
        chrome.tabs.sendMessage(tabs[0].id,{type:"refresh"});
    })
    var btnText = _btn__refresh.innerText;
    _btn__refresh.innerText = "";
    _btn__refresh.classList.add("loading"); 
    setTimeout(()=>{
        initMainApp();
        _btn__refresh.classList.remove("loading");
        _btn__refresh.innerText = btnText;
    },2000);
}

// mapping to btns
_btn__refresh.addEventListener("click",()=>{
    refreshBtnFunc();
})