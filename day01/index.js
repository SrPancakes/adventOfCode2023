import fs from 'fs';


function partOne(file) {
  const lines = fs.readFileSync(file, 'utf8'
  ).trim().split('\n');

  const values = lines
    .map((line) => {
      let first = line.split('').find((v) => !Number.isNaN(Number(v)));
      let last = line.split('').findLast((v) => !Number.isNaN(Number(v)));

      return Number(first + last);
    })
  return values.reduce((a, b) => a + b);
}

console.log(partOne('./puzzleInput.txt'));
