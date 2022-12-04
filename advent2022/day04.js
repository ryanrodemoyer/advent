const fs = require("fs");

const txt = fs.readFileSync("day03.input.txt", "utf8");
const lines = txt.split("\n");

let output = [];

let scoreFullOverlap = 0;
let scorePartialOverlap = 0;
for (let line of lines) {
  const pairs = line.split(",").reduce((acc, curr) => {
    acc.push(...curr.split("-").map((x) => parseInt(x)));
    return acc;
  }, []);

  // 21, 82, 22, 81 =>
  //  0   1   2   3
  const frw = pairs[0] >= pairs[2] && pairs[1] <= pairs[3];
  const rev = pairs[2] >= pairs[0] && pairs[3] <= pairs[1];
  if (frw || rev) {
    scoreFullOverlap++;
    scorePartialOverlap++;
  } else {
    const frw2a = pairs[2] <= pairs[0] && pairs[3] >= pairs[0];
    const frw2b = pairs[2] <= pairs[1] && pairs[3] >= pairs[1];

    const rev2a = pairs[0] <= pairs[2] && pairs[1] >= pairs[2];
    const rev2b = pairs[0] <= pairs[3] && pairs[1] >= pairs[3];
    if (frw2a || frw2b || rev2a || rev2b) {
      scorePartialOverlap++;
    }
  }
}

console.log(scoreFullOverlap);
console.log(scorePartialOverlap);
console.log(output);
console.log("done");
