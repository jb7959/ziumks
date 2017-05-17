/**소수구하기 함수 호출을 위한 AJAX 함수**/
function loadDoc() {
  var xhttp = new XMLHttpRequest();
  var inputNum = document.getElementById("inputNum").value; 
  var url = "./template?inputNum="+inputNum;
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("resultPage").innerHTML =
      this.responseText;
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}