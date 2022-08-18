// "use strict";
// arrow function
var x = 5;
var y = 7;

zzz = "zzz";
console.log(zzz);

console.log(x);
console.log(y);

let z = "z";

const add = (a, b) => {
  return [a + b, zzz, z];
};

const add2 = (a, b) => {
  a = 11;
  b = 10;
  return a + b;
};

var result = add(x, y);
console.log("1", result);

// ?? error
var result1 = add2();
console.log("2", result1);

// ?? error
// var result11 = add(a, b);
// console.log("??", result11);

var result2 = add(1, 2);
console.log("3", result2);

var result3 = add(2, 3);
console.log("4", result3);
