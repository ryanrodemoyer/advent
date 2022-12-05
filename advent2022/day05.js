const fs = require("fs");

const data = fs.readFileSync("day05.input.txt", "utf8");

const stacks = [
    [], // filler
    ["H", "B", "V", "W", "N", "M", "L", "P"],
    ["M", "Q", "H"],
    ["N", "D", "B", "G", "F", "Q", "M", "L"],
    ["Z", "T", "F", "Q", "M", "W", "G"],
    ["M", "T", "H", "P"],
    ["C", "B", "M", "J", "D", "H", "G", "T"],
    ["M", "N", "B", "F", "V", "R"],
    ["P", "L", "H", "M", "R", "G", "S"],
    ["P", "D", "B", "C", "N"],
];

const arr9000 = JSON.parse(JSON.stringify(stacks));
const arr9001 = JSON.parse(JSON.stringify(stacks));

const matches = Array.from(data.matchAll(/move (\d+) from (\d) to (\d)/g)).map((m) => ({
    move: parseInt(m[1]),
    from: parseInt(m[2]),
    to: parseInt(m[3]),
}));

for (let match of matches) {
    const from = arr9000[match.from];
    const to = arr9000[match.to];

    const from9001 = arr9001[match.from];
    const to9001 = arr9001[match.to];
    const temp = [];

    // 9000 - start
    for (let i = 0; i < match.move; i++) {
        const p = from.pop();
        if (p) {
            to.push(p);
        }
    }
    // 9000 - end

    
    // 9001 - start
    for (let i = 0; i < match.move; i++) {
        const p = from9001.pop();
        if (p) {
            temp.push(p);
        }
    }

    for (let i = temp.length-1; i >=0; i--) {
        to9001.push(temp[i]);
    }
    // 9001 - end
}

const res9000 = arr9000.reduce((acc, curr) => {
    const c = curr.pop();
    if (c) {
        acc += c;
    }
    return acc;
}, "");
console.log(res9000);

const res9001 = arr9001.reduce((acc, curr) => {
    const c = curr.pop();
    if (c) {
        acc += c;
    }
    return acc;
}, "");
console.log(res9001);

console.log("done");
