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

//Mapping path of Static file 사용법 : app.use('클라이언트 URI', express.static((__dirname+"실제 서버 경로"));
app.use('/client', express.static(__dirname+"/client"));

//Template Engine Jade
app.set('view engine', 'jade');
 
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

app.post('/upload',upload.single('upload') ,function (req, res) {
  //console.log(req.file.path); //파일경로 읽기
fs.readFile(req.file.path, 'utf8', function(err, data) {console.log("%%%%%%%%#"); //Reading File at ./client/tmp
 var output = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>텍스트 검색기</title>
    </head>
    <body>
        Hello, 텍스트 구하기
        <h1>텍스트 검색하기</h1>
        <ul>
          ${data}
        </ul>
    </body>
  </html>`;  
  res.send(output);
  fs.unlink(req.file.path, function (err) { if (err) throw err; console.log('successfully deleted'+req.file.path); }); //Removing File at ./client/tmp
  }); 
});


 
//소수값 계산 //to-do 170516 : 1000까지는 무난, 멀티 코어처리 필요 
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
function template(argument,primeNum) {
    var output = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>${argument}까지의 소수점 구하기</title>
    </head>
    <body>
        Hello, 소수점 결과!
        <h1>${argument}까지의 소수점 구하기</h1>
        <ul>
          ${primeNum}
        </ul>
    </body>
  </html>`;
  return output;
}
 
//URI 매핑 및 응답
app.get('/template', function (req, res) {
  var primeNum = calc(req.param('inputNum'));
  var output = template(req.param('inputNum'),primeNum);
  res.send(output);
});
 
//서버 실행 
app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
