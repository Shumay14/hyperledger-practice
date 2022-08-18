// 반복문 for, while, do-while
// for
for (var i = 0; i < 7; i++) {
  console.log("for", i);
  if (i == 7) {
    break;
  }
}

//
// while
var i = 0;
while (i < 6) {
  console.log("while", i);
  i++;
}

//
// do-while
var i = 0;
do {
  console.log("do-while", i);
  i++;
} while (i < 5);

//
// do-while2 break
var i = 0;
do {
  console.log("do-while2", i);
  i++;
  if (i == 3) {
    break;
  }
} while (i < 5);

// 반복 코드 실행 중단하고 멈추지않고 다음 반복으로 넘어감
// do-while3 continue
var i = 0;
do {
  console.log("do-while3", i);
  i++;
  if (i == 3) {
    console.log("continue!!");
    continue;
  }
} while (i < 5);

//
// for.html
for (var num = 15; num <= 30; num += 5) {
  console.log("for.html", num);
}

//
// while.html
console.log("0보다 큰 정수를 입력하세요");
var n = 5;
n = parseInt(n);

var i = 0,
  sum = 0;
while (i <= n) {
  sum += i;
  i++;
}

console.log("whilt.html", n, sum);

// continue.html
var sum = 0;
for (i = 1; i <= 7; i++) {
  if (i % 3 != 1) continue;
  console.log("continue.html", i);
  sum += i;
}

console.log(sum);
