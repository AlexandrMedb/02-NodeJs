//  node hw2.js 2021/12/14/21/0/0/0

let dates = process.argv.slice(2).map((el) => {
  let date = el.split("/", 6);
  date[1]--;
  return new Date(...date);
});

let timers = [];

dates.map((el, i) => {
  if (el - new Date() > 0) {
    timers[i] = setInterval(() => {
      console.log(`timer ${i}: ${Math.floor((el - new Date()) / 1000)}`);
    }, 1000 + i * 50);
  } else {
    console.log(`timer ${i} done`);
  }

  setTimeout(() => {
    clearInterval(timers[i]);
    console.log(`timer ${i} done`);
  }, el - new Date());
});
