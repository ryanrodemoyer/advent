pairs = [32, 90, 69, 92];
const frw2a = pairs[2] <= pairs[0] && pairs[3] >= pairs[0];
const frw2b = pairs[2] <= pairs[1] && pairs[3] >= pairs[1];

const rev2a = pairs[0] <= pairs[2] && pairs[1] >= pairs[2];
const rev2b = pairs[0] <= pairs[3] && pairs[1] >= pairs[3];

const res = frw2a || frw2b || rev2a || rev2b;
console.log(res);
console.log({ frw2a, frw2b, rev2a, rev2b });
