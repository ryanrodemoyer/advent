// 1 points => a, x = rock
// 2 points => b, y = paper
// 3 points => c, z = scissors
// w=6, l=0, d=3

const fs = require("fs");

const txt = fs.readFileSync("day02.input.txt", "utf8");
const lines = txt.split("\n");

const lookup = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
};

const score = lines.reduce((acc, curr) => {
  const elfA = lookup[curr[0]],
    elfB = lookup[curr[2]];
  const diff = elfB - elfA;

  if (diff === 0) {
    acc += 3 + elfB;
  } else if (diff === 1 || diff === -2) {
    acc += 6 + elfB;
  } else {
    acc += elfB;
  }

  return acc;
}, 0);

console.log(score);

const alternateWin = {
  A: "Y",
  B: "Z",
  C: "X",
};

const alternateLose = {
  A: "Z",
  B: "X",
  C: "Y",
};

// x LOSE
// y DRAW
// z WIN

const scoreAlternate = lines.reduce((acc, curr) => {
  const elfA = curr[0],
    strategy = curr[2];

  let elfB = null;
  if (strategy === "X") {
    elfB = alternateLose[elfA];
  } else if (strategy === "Y") {
    elfB = elfA;
  } else if (strategy === "Z") {
    elfB = alternateWin[elfA];
  }
  console.log({ a: elfA, b: elfB });

  const diff = lookup[elfB] - lookup[elfA];

  if (diff === 0) {
    acc += 3 + lookup[elfB];
  } else if (diff === 1 || diff === -2) {
    acc += 6 + lookup[elfB];
  } else {
    acc += lookup[elfB];
  }

  return acc;
}, 0);

console.log(scoreAlternate);
