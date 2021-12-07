const colors = require("colors/safe");

const start = Math.round(+process.argv[2]);
const end = Math.round(+process.argv[3]);

if (isNaN(start) || isNaN(end)) {
  console.log("Введите числа");
  return "error";
}

if (start < 1 || end < 1) {
  console.log("Введите числа больше 1");
  return "error";
}

if (start > end) {
  console.log("Введите второе число больше первого");
  return "error";
}

if (end > 100) {
  console.log("Введите второе число меньше 100");
  return "error";
}

let contain = 0;
let signal = 0;
for (let i = start; i <= end; i++) {
  let Simple = true;
  for (let j = 2; j < i; j++) {
    if (i % j == 0) Simple = false;
  }

  if (Simple) {
    contain++;
    switch (signal) {
      case 0:
        console.log(colors.green(i));
        break;
      case 1:
        console.log(colors.yellow(i));
        break;
      case 2:
        console.log(colors.red(i));
        break;
    }
    signal = (signal + 1) % 3;
  }
}
if (contain == 0) console.log(colors.red("В диапозоне нет простых чисел"));
