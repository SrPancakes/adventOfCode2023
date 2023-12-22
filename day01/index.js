import fs from 'fs';

const firstNumberWords = new RegExp(
  ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    .join('|')
);

const lastNumberWords = new RegExp(
  ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    .join('|').split('').reverse().join('')
);

const wordsToNumbers = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9'
};

function calibrate(procedure, file, calibrationValue) {
  if (procedure(file) == calibrationValue) {
    console.log('\nCalibration: COMPLETED');
    return true;
  } else {
    console.log('\nCalibration: FAILED');
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

function partTwo(file) {
  const lines = fs.readFileSync(file, 'utf8'
  ).trim().split('\n');

  const values = lines
    .map((line) => {
      let firstNumberIndex = line.split('').findIndex((v) => !Number.isNaN(Number(v)));
      let firstWordMatch = line.match(firstNumberWords);
      let firstWordNumberIndex = firstWordMatch?.index;

      let firstNumber = firstNumberIndex != -1
        ? firstWordMatch
          ? firstNumberIndex < firstWordNumberIndex
            ? line[firstNumberIndex]
            : wordsToNumbers[firstWordMatch[0]]
          : line[firstNumberIndex]
        : wordsToNumbers[firstWordMatch[0]]

      let lastNumberIndex = line.split('').findLastIndex((v) => !Number.isNaN(Number(v)));
      let lastWordMatch = line.split('').reverse().join('').match(lastNumberWords);
      let lastWordNumberIndex = lastWordMatch ? line.length - 1 - lastWordMatch.index : null;

      let lastNumber = lastNumberIndex != -1
        ? lastWordMatch
          ? lastNumberIndex > lastWordNumberIndex
            ? line[lastNumberIndex]
            : wordsToNumbers[lastWordMatch[0].split('').reverse().join('')]
          : line[lastNumberIndex]
        : wordsToNumbers[lastWordMatch[0].split('').reverse().join('')]

      return Number(firstNumber + lastNumber);
    })
  return values.reduce((a, b) => a + b);
}


if (calibrate(partOne, './examplePart1.txt', 142)) {
  console.log('Proceeding with part 1');
  console.log('RESULT: ' + partOne('./puzzleInput.txt'));
} else {
  console.log('Calibration failed, aborting part 1');
}

if (calibrate(partTwo, './examplePart2.txt', 281)) {
  console.log('Proceeding with part 2');
  console.log('RESULT: ' + partTwo('./puzzleInput.txt'));
} else {
  console.log('Calibration failed, aborting part 2');
}

partTwo('./examplePart2.txt');

