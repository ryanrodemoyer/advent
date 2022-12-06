const fs = require("fs");

const main = () => {
    const data = fs.readFileSync("day03.input.txt", "utf8");
    const lines = data.split("\r\n");

    const bags = [];

    lines.forEach((line) => {
        const bag = { a: {}, b: {} };
        for (let i = 0; i < line.length; i++) {
            const which = i < line.length / 2 ? bag.a : bag.b;
            if (which.hasOwnProperty(line[i])) {
                which[line[i]]++;
            } else {
                which[line[i]] = 1;
            }
        }
        bags.push(bag);
    });

    const score = bags.reduce((acc, curr, i) => {
        // find the intersect of the object keys
        const setB = new Set([...Object.keys(curr.b)]);
        const intersect = new Set([...Object.keys(curr.a)].filter((x) => setB.has(x)));

        if (intersect.size === 0) {
            return acc;
        }

        let points = 0,
            j = intersect.values().next().value;
        if (/[A-Z]/.test(j) === true) {
            // 38 offset from the ASCII value for uppercase letters
            points = j.charCodeAt() - 38;
        } else {
            // 96 offset from the ASCII value for lowercase letters
            points = j.charCodeAt() - 96;
        }
        acc += points;
        return acc;
    }, 0);

    console.log(score);

    const matches = Array.from(data.matchAll(/(.+)\r\n(.+)\r\n(.+)\r\n?/g)).map((x) => ({
        a: x[1],
        b: x[2],
        c: x[3],
    }));
    console.log(matches.length);
    const res2 = matches.reduce((acc,curr) => {
        const c = [...curr.a].filter(x => [...curr.b].includes(x) && [...curr.c].includes(x));

        let points = 0;
        if (/[A-Z]/.test(c) === true) {
            // 38 offset from the ASCII value for uppercase letters
            points = c[0].charCodeAt() - 38;
        } else {
            // 96 offset from the ASCII value for lowercase letters
            points = c[0].charCodeAt() - 96;
        }

        acc+=points;
        return acc;
    }, 0);

    console.log(res2);
    console.log('done');
};

main();
