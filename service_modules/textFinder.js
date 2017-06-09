//file 읽기용
var fs = require('fs');

var doFinder = function(file,serchingText,preProcessingFunc,serchingFunc) {
   var readFiles = preProcessingFunc(file);
       readFiles = serchingFunc(readFiles,serchingText);
       return readFiles;
}

var serchingText = function(data,word){
    var cnt = 0;
    var textInclude = "N";
    var date = new Date();
    var changedWord = word.toLowerCase(); //최종민 전임 참조 17.06.09
    for(var arrayNum in data){
        if(!data[arrayNum].localeCompare(changedWord)){cnt++;} //최종민 전임 참조 17.06.08
    }
    if(cnt>0){textInclude ="Y";}
    
    var outForSaving = "findText : " + word+"\r\n"+"textInclude : " + textInclude+"\r\n"+"textCount : "+cnt+"\r\n"+"Time : " + date.toDateString();
    console.log(date.toDateString());
    //파일명: 날짜_검색문자
    var extractedFileName = Date.now()+"_"+word
    fs.writeFileSync(("./client/tmp/"+extractedFileName+".txt"), outForSaving, 'utf8');
    console.log('동기적 파일 쓰기 완료');
    var out = ["findText : " + word,"textInclude : " + textInclude,"textCount : " + cnt,"Time : " + date.toDateString(),extractedFileName] ; //검색어, 존재유무, 숫자, 시간, 저장파일명
    return out;
}


//데이터 전처리 함수
//정규식 참조 https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/%EC%A0%95%EA%B7%9C%EC%8B%9D#special-or
var preProcessing = function(data){
// 맨앞뒤 공백 삭제 및 소문자
 var readFile=data.trim().toLowerCase(); //장소진 전임 참조 17.06.08
 //정규식으로 문자열 분리/[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9 | 't)]/gi;   // 특수문자 제거('t 등 제외)'  예) ^는 시작문자 , |는 OR,  "" 는 모든 특수문자,gi는대/소문자 무시하고 완전 일치, \s 는 모든 공백 
//var pattern = /[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9) |\w't|\w've|\w'nt|\w's|\w'll|\w're)]/gi; 
var pattern = /[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]/gi;
 //특수문자 모두 공백으로 변환
 readFile = readFile.replace(pattern,',');
 //두개 이상 쉼표는 하나의 쉼표로 변환
 readFile = readFile.replace(/\,{2,10}/,'');
 // /\s(?=\w)/는 공백 후 문자가 나오는 곳만 참조
 var readFiles = readFile.split(',');
 return readFiles;
}


module.exports.serchingText = serchingText;
module.exports.doFinder = doFinder;
module.exports.preProcessing = preProcessing;