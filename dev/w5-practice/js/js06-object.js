// 객체는 자신만의 고유한 구성 속성
// 객체는 여러개의 Property와 Method로 구성
// 현실로 생각하면 실체하고 각자 성질과 기능(동작, 뭔가를 수행)이 있음
// 디지털환경에서 생각하면.. 특성을 가지고 기능하는 대상의 단위
// 현실을 생각해보면 객체단위로 움직이고 소통한다.
// 내가 움직이고 집단에 소속되고 등등
// 객체 지향 프로그래밍
// 객체가 가지고 있는 속성, 변수, 데이터 -> 프로퍼티
// 객체가 가지고 있는 기능, 함수 -> 메소드

// account 객체
let account = {
  owner: "seojangyeon",
  age: "14",
  balance: 10000,
  address: "sejong-si",
  deposit: function (money) {
    this.balance = this.balance + money;
    return this.balance;
  },
  withdraw: function (money) {
    this.balance = this.balance - money;
    return this.balance;
  },
};

// function Person() {
//   //document.write("output value");
// }

// let person1 = new Person();
let Owner = account.owner;

console.log(account.owner);
console.log(Owner);
console.log(account.deposit(100));
console.log(account.withdraw(100));

// object.html
// Date 객체 생성
var today = new Date();

var day = today.getDay();

console.log(today.toDateString());
console.log(day);

// Date 객체의 toLocaleString() 메소드 호출
console.log(today.toLocaleString());
