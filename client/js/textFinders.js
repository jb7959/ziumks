/**
 * Created by 안재열 on 2017-06-09.
 */

/**텍스트 검색후 다운로드를 위한 AJAX 함수**/
function download() {
    var xhttp = new XMLHttpRequest();
    var inputNum = document.getElementById("inputNum").value;
    var url = "./upload/download";
    xhttp.open("POST", url, true);
    xhttp.send();
}