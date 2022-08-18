// 조건 연산자
// ture false 기반으로 움직임
// condition? expT:expF
// condition 이 true 이면 전체 결과는 expT 의 계산 값
// condition 이 false 이면 전체 결과는 expF 의 계산 값

// x>y가 true이면 x=5, false면 y=3가 big 변수에 대입된다.
var x = 5,
  y = 3;
var big = x > y ? x : y;
console.log(big); // 5

var a = 7,
  b = 9;
var big2 = a > b ? a - b : b - a;
console.log(big2); // 2

// if 조건문으로 만들기
function Big(a, b) {
  if (a > b) {
    result1 = a - b;
    console.log("result1", result1);
    return result1;
  } else if (a < b) {
    result2 = b - a;
    console.log("result2", result2);
    return result2;
  }
}
// Big();
Big(a, b);
Big(11, 15);
Big(17, 12);

// if, if else
// 조건문은 결과가 true false 기반으로 움직임
if (a > b) {
  console.log("a is bigger than b");
} else if (a < b) {
  console.log("b is bigger than a");
} else {
  console.log("a and b is same");
}

// switch
// 값에 따라 서로 다른 코드를 실행할 때, switch문이 적합
var fruits = "Apple";
switch (fruits) {
  case "Banana":
    price = 200;
    break;

  case "Apple":
    price = 300;
    break;

  case "Cherry":
    price = 400;
    break;

  default:
    price = 0;
    console.log("Fruits Is Not For Sale");
}

// switch()
console.log(price);

// case 문의 값은 상수(리터럴)만 가능
