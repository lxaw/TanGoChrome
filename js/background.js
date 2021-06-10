// Written (with love) by Lex Whalen
console.log("in the background");

class HashMap{
    // converts and array into 
    // dict like object
    constructor(arr){
        this._arr = arr;
        this._dict = this.arrToDict(this._arr);
        this._items = this.sortDict(this._dict);
    }
    arrToDict(arr){
        // converts and array to dict object
        // unsorted
        var d = {};
        arr.forEach(e=>{
            if(d[e] == undefined){
                // no key yet
                d[e] = 1;
            }else{
                d[e] +=1;
            }
        })
        return d;
    }
    sortDict(d){
        // maybe add reverse options????
        // returns a sorted dict
        var sort_d = {};
        var items = Object.keys(d).map((k)=>{
            return [k,d[k]];
        })
        // now sort on key
        items.sort((first,second)=>{
            // 2nd - 1st detemines pos
            return second[1] - first[1];
        })
        return items;
    }
    getSortArr(){
        return this._items;
    }
}
class displayData{
    constructor(){
        this._dataStr;
        // we have to tokenize in the popup.js
        this._tokenArr;
        this._sortedItemArr;

        // for kanji
        this._kanjiArr;
        this._sortedKanjiArr;
    }
    updateDatabase(payload){
        // this function is called when content.js sends a message
        // ie when we hit new page

        var stripped_jString = payload[0];
        var kanji_arr = payload[1];
        // 1st set the dataStr and kanji
        this.setDataStr(stripped_jString);
        this.setKanjiArr(kanji_arr);
        this.setSortedKanjiArr(kanji_arr);
        // then build database
        // note, we don't pass the kanji arr in it bc that doesnt need tokenization
        this.buildDatabase(this.getDataStr());
    }
    buildDatabase(aStr){
        if(aStr == undefined){
            return;
        }
        kuromoji.builder({ dicPath: "../kuromoji/dict/" }).build((err,tokenizer)=>{
            // tokenizer is now ready
            var token_arr = []
            var path = tokenizer.tokenize(aStr);
            path.forEach((e)=>{
                token_arr.push(e.surface_form);
            })
            
            // now we do all other processes that need build to be complete
            // set the token array we just made
            this.setTokenArr(token_arr);
            // set the sorted item arr from the token array
            this.setSortedItemArr(this.getTokenArr());
        })
    }
    getResponse(){
        // we can grab the data from here
        // we sent a payload of format: [wordStr, kanjiArr]
        chrome.runtime.onMessage.addListener((payload,sender,sendResponse)=>{
            console.log('in background: response');
            // for debugging
            // console.log(response);
            // now that we got message update db
            this.updateDatabase(payload);
        });
    } 
    // Getters and Setters
    getMostCommonKanji(){
        if(this._sortedKanjiArr == undefined){
            return;
        }
        return this._sortedKanjiArr[0];
    }
    getLeastCommonKanji(){
        if(this._sortedKanjiArr == undefined){
            return;
        }
        return this._sortedKanjiArr.pop();
    }
    getSortedKanjiArr(){
        return this._sortedKanjiArr;
    }
    getMostCommonWord(){
        if(this._sortedItemArr == undefined){
            return;
        }
        return this._sortedItemArr[0];
    }
    getLeastCommonWord(){
        if(this._sortedItemArr == undefined){
            return;
        }
        return this._sortedItemArr.pop();
    }
    getDoneBuilding(){
        return this._doneBuilding;
    }
    setKanjiArr(anArr){
        if(anArr == undefined){
            return;
        }
        this._kanjiArr = anArr;
    }
    setSortedItemArr(anArr){
        if(anArr == undefined){
            return;
        }
        var hm = new HashMap(anArr);
        this._sortedItemArr = hm.getSortArr();
    }
    setSortedKanjiArr(anArr){
        if(anArr == undefined){
            return;
        }
        var hm = new HashMap(anArr);
        this._sortedKanjiArr = hm.getSortArr();
    }
    getSortedItemArr(){
        return this._sortedItemArr;
    }
    setDataStr(aStr){
        this._dataStr = aStr;
    }
    setTokenArr(anArr){
        this._tokenArr = anArr;
    }
    getTokenArr(){
        return this._tokenArr;
    }
    getDataStr(){
        return this._dataStr;
    }
}

var data = new displayData();
data.getResponse();
