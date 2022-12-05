const fs = require('fs');

const main = () => {
    const data = fs.readFileSync('day01.input.txt', 'utf8');

    const s = data.split('\r\n');

    const vals = [];
    vals.push(0);

    let i = 1;
    s.forEach(num => {
        if (num === '')
        {
            i++;
        } else {
            if (vals.length === i)
            {
                vals.push(0);
            }

            const p = parseInt(num);
            vals[i]+=p;
        }
    });

    let idx = 1;
    let max = vals[1];
    for (let j = 2; j < vals.length; j++) {
        if (vals[j] > max) {
            idx = j;
            max = vals[j];
        }
    }

    console.log(vals);
    console.log({idx, max});

    vals.sort((a,b)=>b-a);
    const top3 = vals[0]+vals[1]+vals[2];
    console.log(vals);
    console.log(top3);
};

main();