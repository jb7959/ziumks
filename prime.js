/****
    Writer : Jae Yeoul Ahn
    Propose : This code is for private task by ZiumKS to be good Junior consuktant. 소수점 구하기 문제
    Date : 2017.05.16
****/
 
var express = require('express');
var app = express();
//HTTP의 multipart/form-data 처리용 
var multer = require('multer'); // v1.0.5
var upload = multer({ dest: './client/tmp/' }); //임시 디렉토리
//file 읽기용
var fs = require('fs');
//MapReduce 용 패키지 
var mapReduce = require('mapred')(1);



//Mapping path of Static file. 사용법 : app.use('클라이언트 URI', express.static((__dirname+"실제 서버 경로"));
app.use('/client', express.static(__dirname+"/client"));

//Template Engine Jade 설치 및 views 디렉토리 경로 설정(Views 디렉토리는 추가 생성했음 17.05.25)
app.set('view engine', 'jade');
app.set('views', './client/views');
 
//index 페이지 (1번과제)
app.get('/', function (req, res) {
  var output = `
<div id="index">
<h1>개별과제 1 소수구하기</h1>
<h3>A) 1부터 10000까지 숫자 중 소수 (1과 자기 자신으로만 나눌 수 있는 정수)를 구하는 
     프로그램을 구현하시오.</br>
  - 서버에서 또는 서버연동 화면으로 실행 (언어무관)
</h3>
<form>
<input type="text" size="7" id="inputNum" />
</form>
<button type="button" onclick="loadDoc()">결과값보기</button>
</div>
<div id = resultPage></div>
<!--AJAX -->
<script src="./client/js/primes.js"></script>`;  
  res.send(output);
});

//2번과제
app.get('/2', function (req, res) {
  var output = `
<div id="index">
<h1>개별과제 2 파일내 텍스트 확인기</h1>
<h3> B) 텍스트 형태의 파일에서 특정 문자열을 찾아 검출여부, 검출횟수를 파일로 기록하는
    프로그램을 구현하시오.</br>
  - 입/출력 파일 서버 참조 home/zium/cc/testin.txt  ,   home/zium/cc/testout.txt </br>
  - 서버에서 또는 서버연동 화면으로 실행 (언어무관)

</h3>
<form action="./upload" method="post" enctype="multipart/form-data">
<input type="file" name="upload" id="uploadfile" />
<input type="text" size="7" id="serchingText" />
<input type="submit" name="upload" id="upload"/>
</form>
</div>
<div id = resultPage></div>
<!--AJAX -->
<script src="./client/js/primes.js"></script>`;

  res.send(output);
});

//파일 읽고, 처리 
app.post('/upload',upload.single('upload') ,function (req, res) {
 //console.log(req.file.path); //파일경로 읽기
 var readFile = fs.readFileSync(req.file.path,'utf8'); //Reading File at ./client/tmp 동기방식으로 읽고 buffer로 제공 (옵션으로 두번째 인수로 'utf8' 삽입시 String 반환 )
 var readFiles = doFinder(readFile,"was",preProcessing,serchingText);
 template(readFiles,res,2); //템플릿엔진을 사용하여 변환
 fs.unlink(req.file.path, function (err) { if (err) throw err; console.log('successfully deleted'+req.file.path); }); //Removing File at ./client/tmp
});


function doFinder(file,serchingText,preProcessingFunc,serchingFunc) {
   var readFiles = preProcessingFunc(file);
       readFiles = serchingFunc(readFiles,serchingText);
       return readFiles;
}


//데이터 전처리 함수
//정규식 참조 https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/%EC%A0%95%EA%B7%9C%EC%8B%9D#special-or
function preProcessing(data){
// 맨앞뒤 공백 삭제 및 소문자
 var readFile=data.trim().toLowerCase();
 //정규식으로 문자열 분리/[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9 | 't)]/gi;   // 특수문자 제거('t 등 제외)'  예) ^는 시작문자 , |는 OR,  "" 는 모든 특수문자,gi는대/소문자 무시하고 완전 일치, \s 는 모든 공백 
//var pattern = /[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9) |\w't|\w've|\w'nt|\w's|\w'll|\w're)]/gi; 
var pattern = /[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]/gi;
 //특수문자 모두 공백으로 변환
 readFile = readFile.replace(pattern,',');
 //두개 이상 쉼표는 하나의 쉼표로 변환
 readFile = readFile.replace(/\,{2,10}/,'');
 // /\s(?=\w)/는 공백 후 문자가 나오는 곳만 참조
 var readFiles = readFile.split(',');
 serchingText(readFiles);
 return readFiles;
}

function serchingText(data,findText){
    var textC = 0;
    var textInclude = "N";
    for(var arrayNum in data){
        if(data[arrayNum] == "was"){textC++;}
    }
    if(textC>0){textInclude ="Y";}
    var out = ["findText : " + findText,"textInclude : " + textInclude,"textCount : " + textC] ;
    return out;
}

//소수값 계산
function calc(endNum) {
    var resultValue = "2</br>3<br>";
     console.log("******")
    for(var i=4;(i<=endNum);i++){
        var checkP = 0;//나눠지는 숫자개수
        
        for(var j=1;j<=i;j++){
            //console.log(i+"%"+j+"="+i%j);
            /**https://ko.wikipedia.org/wiki/밀러-라빈 소수판별법
             * 판별할 수 n의 크기가 작을 경우, 작은 수의 a에 대해서만 검사해보면 결정론적으로 소수를 판별할 수 있다는 것이 알려져 있다.
             * Pomerance, Selfridge, Wagstaff 그리고 Jaeschke에 의하면,
             * n<1,373,653일 경우 a=2,3에 대해서만 검사해보면 충분하다.
             **/
            if(i%2==0){break;}
            if(i%3==0){break;}
            if(i%j==0){checkP++;}
            if(checkP>2){break;}
        }
        //console.log("i가 "+i+"일떄"+"checkP 는 "+ checkP);
        if(checkP==2){resultValue+=(i.toString()+"</br>");}
        checkP = 0;
    }
    console.log("******")
    return resultValue;
}
 
//html 템플릿 작성 함수
//index, 1, 2에 따라서 템플릿 리턴 
function template(argument1,argument2,routeOfURL) {
    var output = "sorry";
    //argument1은 범위 끝 숫자, argument2는 범위내 소수값
  if(routeOfURL==1){output = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>${argument1}까지의 소수점 구하기</title>
    </head>
    <body>
        Hello, 소수점 결과!
        <h1>${argument1}까지의 소수점 구하기</h1>
        <ul>
          ${argument2}
        </ul>
    </body>
  </html>`;}
    //argument1은 검색결과,argument2는 Http request
  if(routeOfURL==2){
   //Jade로 렌더링 filesWords와 title은 jade에서 사용하는 변수
   argument2.render('SecondProject', {filesWords:argument1, title:'텍스트 검색기'});
 }
  return output;
}
 
//URI 매핑 및 응답
app.get('/template', function (req, res) {
  var primeNum = calc(req.param('inputNum'));
  var output = template(req.param('inputNum'),primeNum,1);
  res.send(output);
});
 
//서버 실행 
app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
