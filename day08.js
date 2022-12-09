const fs = require("fs");

const data = fs.readFileSync("day08.input.txt", "utf8");
const lines = data.split("\r\n");

const arr = [];

// map the input to an array of object arrays
// object consists of the cell value and whether it's visible from left, right, top, bottom
// ultimately, goal of algorithm is to determine whether at least directional value equals `true`
for (const line of lines) {
    arr.push([...line].map((x) => ({ v: parseInt(x), l: true, r: true, t: true, b: true })));
}

const evals = {};

// traverse the data by rows excluding the perimeter values
// of the trees we have seen in a row, track those values in a set
// if the current item exists in the set then there is another tree in the way that is too tall
// if the current item does not exist, we can see the tree when looking from THAT direction
// then add it to our tracked tree count
for (let i = 1; i < arr.length - 1; i++) {
    const bounds = {
        l: arr[i][0].v,
        r: arr[i][arr[i].length - 1].v,
    };

    let seen = {
        l: new Set([...Array(bounds.l + 1).keys()]),
        r: new Set([...Array(bounds.r + 1).keys()]),
    };

    evals[i.toString()] = [];
    for (let j = 1, r = arr[i].length - 2; j < arr[i].length - 1; j++, r--) {
        const curr = arr[i][j]; // current value looking from the left
        const rcurr = arr[i][r]; // current value looking from the right
        evals[i.toString()].push(r);
        if (seen.l.has(curr.v)) {
            curr.l = false;
        } else {
            // update our set with the grid value we just evaluated
            seen.l = new Set([...seen.l, ...Array(curr.v + 1).keys()]);
        }
        if (seen.r.has(rcurr.v)) {
            rcurr.r = false;
        } else {
            // update our set with the grid value we just evaluated
            seen.r = new Set([...seen.r, ...Array(rcurr.v + 1).keys()]);
        }
    }
}

// traverse the data by columns excluding the perimeter values
// of the trees we have seen in a column, track those values in a set
// if the current item exists in the set then there is another tree in the way that is too tall
// if the current item does not exist, we can see the tree when looking from THAT direction
// then add it to our tracked tree count
for (let i = 1; i < arr[0].length - 1; i++) {
    const bounds = {
        t: arr[0][i].v,
        b: arr[arr.length - 1][i].v,
    };

    let seen = {
        t: new Set([...Array(bounds.t + 1).keys()]),
        b: new Set([...Array(bounds.b + 1).keys()]),
    };

    for (let j = 1, b = arr[i].length - 2; j < arr[i].length - 1; j++, b--) {
        const curr = arr[j][i]; // current value looking from the top
        const bcurr = arr[b][i]; // current value looking from the bottom

        if (seen.t.has(curr.v)) {
            curr.t = false;
        } else {
            // update our set with the grid value we just evaluated
            seen.t = new Set([...seen.t, ...Array(curr.v + 1).keys()]);
        }
        if (seen.b.has(bcurr.v)) {
            bcurr.b = false;
        } else {
            // update our set with the grid value we just evaluated
            seen.b = new Set([...seen.b, ...Array(bcurr.v + 1).keys()]);
        }
    }

    console.log();
}

// print a grid of * characters to represent what trees we would see
// also count how many trees we have to get our answer
// process the array from the top going left-to-right, then next row, etc.
for (let i = 0; i < arr.length; i++) {
    process.stdout.write(`0${i + 1} `.slice(-3));
    for (let j = 0; j < arr[i].length; j++) {
        const curr = arr[i][j];
        if (curr.l || curr.r || curr.t || curr.b) {
            process.stdout.write("" + "\x1b[32m");
            process.stdout.write(curr.v.toString());
            process.stdout.write("" + "\x1b[0m" + "");
        } else {
            process.stdout.write(curr.v.toString());
        }
    }
    console.log();
}

const res = arr.reduce((acc, curr) => {
    acc += curr.filter((y) => y.l || y.r || y.t || y.b).length;
    return acc;
}, 0);

console.log(res);
console.log("done");
