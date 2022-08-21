// array

var week = ["Mon", "Tue", "Wed"];

var week2 = new Array("월", "화", "수", "목");

week[5] = "Sat";

console.log(week);
delete week[5];
console.log(week);

week[6] = "Sun";
week[7] = 7;

console.log(week);
console.log(week2);

var len = week.length;
console.log(len);

var len2 = week2.length;
console.log(len2);
