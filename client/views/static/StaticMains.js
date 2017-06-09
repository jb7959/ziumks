/**
 * Created by 안재열 on 2017-06-09.
 */

var getView = function (serviceNumber) {
    var output = "";
    if (serviceNumber == 1) {
        output = '<div id="index">' +
            '<h1>개별과제 1 소수구하기</h1>' +
            '<h3>A) 1부터 10000까지 숫자 중 소수 (1과 자기 자신으로만 나눌 수 있는 정수)를 구하는 프로그램을 구현하시오.</br>' +
            '- 서버에서 또는 서버연동 화면으로 실행 (언어무관)</h3>' +
            '<form>' +
            '<input type="text" size="7" id="inputNum" />' +
            '</form>' +
            '<button type="button" onclick="loadDoc()">결과값보기</button>' +
            '</div>' +
            '<div id = resultPage></div>' +
            '<!--AJAX -->' + '<script src="./client/js/primes.js"></script>';
    }
    if (serviceNumber == 2) {
        output = '<div id="index">' +
            '<h1>개별과제 2 파일내 텍스트 확인기</h1>' +
            '<h3> B) 텍스트 형태의 파일에서 특정 문자열을 찾아 검출여부, 검출횟수를 파일로 기록하는 프로그램을 구현하시오.</br>' +
            '- 입/출력 파일 서버 참조 home/zium/cc/testin.txt  ,   home/zium/cc/testout.txt </br>' +
            '- 서버에서 또는 서버연동 화면으로 실행 (언어무관)' +
            '</h3><table><form action="./upload" method="post" enctype="multipart/form-data">' +
            '<tr><th><p>업로드 파일 :</p></th>' +
            '<td><input type="file" name="upload" id="uploadfile" /></tr></td>' +
            '<tr><th><p>검색어 :</p></th>' +
            '<td><input type="text" size="7" id="word" name="word" /></tr></td>' +
            '<th><p>     </p></th>' +
            '<tr><td><input type="submit" name="upload" id="upload"/></tr></td>' +
            '</form></table>' +
            '</div> <div id = resultPage></div>';
    }
    return output;
}

module.exports.getView = getView;