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
// ************ Functions for the buttons ************


// ************ Mapping buttons to functions ************
_words__topBtn.addEventListener("click",()=>{

})


// ************ Static display data *************
// display the words
function showWords(){
    // populates the words display
    _html_display__words.innerText = _bgData.getSortedItemArr();
}
// display the most common/least common word / kanji
function showMostCommonWord(){
    // populates the most common word on the html
    _html_display__mostCommonWord.innerText = _bgData.getMostCommonWord();
}
function showLeastCommonWord(){
    // populates the least common word on the html
    _html_display__leastCommonWord.innerText = _bgData.getLeastCommonWord();
}
// display the kanji
function showKanji(){
    // populates the kanji display
    console.log("show kanji func");
    console.log(_bgData.getSortedKanjiArr());
    _html_display__kanji.innerText = _bgData.getSortedKanjiArr();
}
function showMostCommonKanji(){
    // populates the most common kanji on the html
    _html_display__mostCommonKanji.innerText = _bgData.getMostCommonKanji();
}
function showLeastCommonKanji(){
    // populates the least common kanji on the html
    _html_display__leastCommonKanji.innerText = _bgData.getLeastCommonKanji();
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
