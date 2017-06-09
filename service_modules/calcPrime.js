//소수값 계산
var calc = function (endNum) {
    var resultValue = [2,3];
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
        if(checkP==2){resultValue.push(i)}
        checkP = 0;
    }
    console.log("******")
return resultValue;
}

module.exports.calc = calc;