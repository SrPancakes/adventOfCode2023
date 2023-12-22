import fs from 'fs';

function calibrate(file, calibrationValue) {
  if (partOne(file) == calibrationValue) {
    console.log('Calibration: COMPLETED');
    return true;
  } else {
    console.log('Calibration: FAILED');
    return false;
  }
}

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

if (calibrate('./examplePart1.txt', 142)) {
  console.log('Proceeding to part 1');
  console.log('RESULT: ' + partOne('./puzzleInput.txt'));
} else {
  console.log('Calibration failed, aborting part 1');
}

