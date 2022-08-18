// 조건 연산자
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
  }
}
