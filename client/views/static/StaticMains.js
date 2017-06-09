/**
 * Created by 안재열 on 2017-06-09.
 */

var getView = function (serviceNumber) {
    var output = "";
    if (serviceNumber == 1) {
        output =
            '<head>' +'<title>Prime</title><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">' +
            '</head>'+
            '<body>'+
            '<div class="container-fluid">'+
            '<div id="row">  <div class="col-md-3"></div>' +
            '<div class="col-md-6"><h1>개별과제 1 소수구하기</h1>' +
            '<h5>A) 1부터 10000까지 숫자 중 소수 (1과 자기 자신으로만 나눌 수 있는 정수)를 구하는 프로그램을 구현하시오.</br>' +
            ' - 서버에서 또는 서버연동 화면으로 실행 (언어무관)</h5></br>' +
            '<form>' +
            '<input type="text" size="7" class="form-control" id="inputNum" placeholder="원하는 범위의 숫자를 입력해 주세요." />' +
            '</form>' +
            '<button type="button" class="btn btn-primary" onclick="loadDoc()">결과값보기</button>' +
            '</div><div class="col-md-3"/></div>' +
            '<div id="row"> <div id = resultPage class="col-md-3 col-md-offset-3"/></div></div>' +
            '<!--AJAX -->' + '<script src="./client/js/primes.js"></script>'+
            '</body>';

    }
    if (serviceNumber == 2) {
        output = '<head>' +'<title>TextFinder</title><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"></head>' +
            '<body>'+
            '<div id="row"> <div class="col-md-4"></div>' +
            '<div class="col-md-4"><h1>개별과제 2 파일내 텍스트 확인기</h1>' +
            '<h5> B) 텍스트 형태의 파일에서 특정 문자열을 찾아 검출여부, 검출횟수를 파일로 기록하는 프로그램을 구현하시오.</br>' +
            '- 입/출력 파일 서버 참조 home/zium/cc/testin.txt , home/zium/cc/testout.txt </br>' +
            '- 서버에서 또는 서버연동 화면으로 실행 (언어무관)</br>' +
            '</h5><table class="table table-striped"><form action="./upload" method="post" enctype="multipart/form-data">' +
            '<tr><th><p>업로드 파일 :</p></th>' +
            '<td><input type="file" name="upload" id="uploadfile" /></tr></td>' +
            '<tr><th><p>검색어 :</p></th>' +
            '<td><input type="text" class="form-control" size="7" id="word" name="word"  placeholder="검색을 원하는 텍스트를 입력해 주세요."/></tr></td>' +
            '<tr><th><p>               </p></th>' +
            '<td><input type="submit" name="upload" id="upload" class="btn btn-default" align="right"/></td></tr>' +
            '</form></table>' +
            '</div> <div id = resultPage></div></div><div class="col-md-4"></div></body>';
    }
    return output;
}

module.exports.getView = getView;