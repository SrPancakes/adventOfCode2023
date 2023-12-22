import fs from 'fs';

const maxCount = {
  red: 12,
  green: 13,
  blue: 14,
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

  return lines.map((line) => {
    return line
      .split(': ')[1]
      .split('; ')
      .map((set) => {
        const pulls = set.split(', ');
        return pulls.every((pull) => {
          const [count, color] = pull.split(' ');
          return maxCount[color] >= Number(count);
        });
      }).every((p) => p);
  }).reduce((s, result, i) => {
    return result ? s + (i + 1) : s;
  }, 0);
}

function partTwo(file) {
  const lines = fs.readFileSync(file, 'utf8'
  ).trim().split('\n');

  return lines.map((line) => {
    const maxCount = {
      red: 0,
      green: 0,
      blue: 0,
    };
    line
      .split(': ')[1]
      .split('; ')
      .forEach((set) => {
        const pulls = set.split(', ');
        return pulls.forEach((pull) => {
          const [count, color] = pull.split(' ');
          if (maxCount[color] < Number(count)) {
            maxCount[color] = Number(count);
          }
        });
      });
    return maxCount.red * maxCount.green * maxCount.blue;
  }).reduce((a, b) => a + b);
}

if (calibrate(partOne, './examplePart1.txt', 8)) {
  console.log('Proceeding with part 1');
  console.log('RESULT: ' + partOne('./puzzleInput.txt'));
} else {
  console.log('Calibration failed, aborting part 1');
}

if (calibrate(partTwo, './examplePart2.txt', 2286)) {
  console.log('Proceeding with part 2');
  console.log('RESULT: ' + partTwo('./puzzleInput.txt'));
} else {
  console.log('Calibration failed, aborting part 2');
}
