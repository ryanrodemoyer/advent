const fs = require("fs");

const data = fs.readFileSync("day06.input.txt", "utf8");
const arr = [...data];

const MARKER_SIZE=4;

// begin by creating an array of length MARKER_SIZE
// skip the first MARKER_SIZE items from the array
// one by one, process the items in `arr`
// `buffer` is converted to Set which will give us unique items in the array
// if buffer is length=MARKER_SIZE then we found the message
// otherwise, remove the left most item from `buffer` and push item to right side of `buffer`

const buffer = arr.slice(0, MARKER_SIZE);
for (let i = MARKER_SIZE; i < arr.length; i++) {
    // we do the check first, then add the character
    // puzzle says we want the index number of the NEXT character
    // after we find the unique four character marker
    const set = new Set(buffer);
    if (set.size === MARKER_SIZE)
    {
        console.log(buffer);
        console.log(i);
        break;
    }

    // if we have [1,2,3,4] then this results in [2,3,4]
    buffer.splice(0, 1); 
    
    buffer.push(arr[i]);
}