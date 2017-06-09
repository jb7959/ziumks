/****
 Writer : Jae Yeoul Ahn
 Propose : This code is for private task by ZiumKS to be good Junior consuktant. 소수점 구하기 문제
 Date : 2017.05.16
 ****/

//import servicemodules for server.js
const mainView = require('./client/views/static/StaticMains.js');
const textFinder = require('./service_modules/textFinder.js');
const calcPrime = require('./service_modules/calcPrime.js');

var express = require('express');
var app = express();
//HTTP의 multipart/form-data 처리용 
var multer = require('multer'); // v1.0.5
var upload = multer({dest: './client/tmp/'}); //임시 디렉토리
//file 읽기용
var fs = require('fs');

//Mapping path of Static file. 사용법 : app.use('클라이언트 URI', express.static((__dirname+"실제 서버 경로"));
app.use('/client', express.static(__dirname + "/client"));

//Template Engine Jade 설치 및 views 디렉토리 경로 설정(Views 디렉토리는 추가 생성했음 17.05.25)
app.set('view engine', 'jade');
app.set('views', './client/views');

//index 페이지 (1번과제)
app.get('/', function (req, res) {
    var output = mainView.getView(1);
    res.send(output);
});

//prime 계산을 위한 AJAX 호출 URI 매핑 및 응답
app.get('/template', function (req, res) {
    var primeNum = calcPrime.calc(req.param('inputNum'));
    var endNum = req.param('inputNum');
    template(res, 1, [endNum, primeNum]); //템플릿엔진을 사용하여 변환
});

//2번과제
app.get('/finder', function (req, res) {
    var output = mainView.getView(2);
    res.send(output);
});

//파일 읽고, 처리 //multer를위한 미들웨어 upload.single('upload')는 뒤의 function(req, res)함수가 실행되기 전에 먼저 실행.매개변수 'upload'는 form을 통해 전송되는 파일의 name속성을 가져야 함.
app.post('/upload', upload.single('upload'), function (req, res) {
    //console.log(req.file.path); //파일경로 읽기
    var readFile = fs.readFileSync(req.file.path, 'utf8'); //Reading File at ./client/tmp 동기방식으로 읽고 buffer로 제공 (옵션으로 두번째 인수로 'utf8' 삽입시 String 반환)
    var word = req.body.word;
    var serchingTextFunc = textFinder.serchingText;
    var preProcessingFunc = textFinder.preProcessing;
    var data = textFinder.doFinder(readFile, word, preProcessingFunc, serchingTextFunc);
    var extractedFileName = data[4];
    data.pop(); //데이터 맨뒤 extractedFileName 제거
    template(res, 2, [data, extractedFileName]);
    ; //템플릿엔진을 사용하여 변환
    fs.unlink(req.file.path, function (err) {
        if (err) throw err;
        console.log('successfully deleted' + req.file.path);
    }); //Removing File at ./client/tmp
});

app.get('/download/:id', function (req, res) {
    var downloadLocation = './client/tmp/' + req.params.id + '.txt';
    res.download(downloadLocation);
    //fs.unlink(req.file.path, function (err) { if (err) throw err; console.log('successfully deleted'+req.file.path); }); //Removing File at ./client/tmp
});


//html 템플릿 작성 함수
//index, 1, 2에 따라서 템플릿 리턴
function template(HTTPResponse, routeOfURL, data) {
    var output = "sorry";
    //data[0]은 범위 끝 숫자, data[1] 범위내 소수값
    if (routeOfURL == 1) {
        HTTPresponse.render('primeProject', {endNumber: data[0], primeNumbers: data[1]});
    }

    //data[0]은 검색어, data[1]은 파일명
    if (routeOfURL == 2) {
        //Jade로 렌더링 filesWords와 title은 jade에서 사용하는 변수
        HTTPResponse.render('SecondProject', {filesWords: data[0], title: '텍스트 검색기', fileName: data[1]});
    }
    return output;
}

//서버 실행 
app.listen(9002, function () {
    console.log('Example app listening on port 9002!');
});
