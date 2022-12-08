const { table } = require("console");
const fs = require("fs");

const data = fs.readFileSync("day07.input.txt", "utf8");
const lines = data.split("\r\n");

const root = {
    paths: [],
    path: "",
    files: [],
    table: {},
};

const reducer = (acc, curr) => {
    let addFile = false;
    if (curr.startsWith("$ cd ..")) {
        acc.paths.pop();
    } else if (curr.startsWith("dir") || curr === "$ ls") {
        // do nothing
    } else if (curr.startsWith("$ cd ")) {
        const dir = curr.slice(5);
        acc.paths.push(dir);
    } else {
        addFile = true;
    }

    acc.path = acc.paths.join("/").replace("//", "/");

    if (addFile) {
        if (/\d+ .+/.test(curr)) {
            const m = curr.match(/(\d+) (.+)/);
            const size = parseInt(m[1]);
            const name = m[2];
            acc.files.push({
                directory: acc.path,
                file: name,
                size: size,
            });

            let temp = Array.from(acc.paths);
            while (temp.length > 0) {
                const p = temp.join("/").replace("//", "/");
                if (acc.table.hasOwnProperty(p)) {
                    acc.table[p] += size;
                } else {
                    acc.table[p] = size;
                }
                temp.pop();
            }
        }
    }

    return acc;
};

const res = lines.reduce(reducer, root);
console.log(res);

let total = 0;
for (const entry of Object.keys(res.table)) {
    if (res.table[entry] <= 100000) {
        total += res.table[entry];
    }
}
console.log(total);

const DRIVE_SIZE = 70000000;
const SPACE_USED = res.table["/"];
const SPACE_FREE = DRIVE_SIZE - SPACE_USED;
const SPACE_NEEDED = 30000000 - SPACE_FREE;

const res2 = Object.keys(res.table).reduce((acc, curr) => {
    if (res.table[curr] >= SPACE_NEEDED) {
        acc.push(res.table[curr]);
    }
    return acc;
}, []);
res2.sort((a, b) => a - b);
console.log(res2[0]);

// - / (dir)
//   - a (dir)
//     - e (dir)
//       - i (file, size=584)
//     - f (file, size=29116)
//     - g (file, size=2557)
//     - h.lst (file, size=62596)
//   - b.txt (file, size=14848514)
//   - c.dat (file, size=8504156)
//   - d (dir)
//     - j (file, size=4060174)
//     - d.log (file, size=8033020)
//     - d.ext (file, size=5626152)
//     - k (file, size=7214296)
