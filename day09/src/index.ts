import fs from 'fs';

const input: String = fs.readFileSync('data/input.txt', 'utf-8');
const xmasCode: number[] = input.split('\n').map((n) => parseInt(n, 10));

const windowSize = 25;

const findInvalidNumber = (sequence: number[]) => {
  const window = sequence.slice(0,windowSize);
  for (const n of sequence.slice(windowSize)) {
    const differences = window.map((w) => (n - w));
    const containsSum = differences.some((d) => window.includes(d));
    if (!containsSum) return n;
    window.shift();
    window.push(n);
  }
  return window.length;

}

console.log(`Part 1 - ${findInvalidNumber(xmasCode)}`);

const findSumOfInvalidRange = (sequence: number[]) => {
  const invalidNumber = findInvalidNumber(sequence);
  const invalidSequence = sequence.slice(0, sequence.indexOf(invalidNumber) + 1);
  let sum = 0;
  let sumArr = [];
  for (let i = 0; i < invalidSequence.length; i += 1) {
    sum += invalidSequence[i];
    sumArr.push(invalidSequence[i]);
    for (let j = i + 1; j < invalidSequence.length; j += 1) {
      sum += invalidSequence[j];
      sumArr.push(invalidSequence[j]);
      if (sum === invalidNumber) {
        const sorted = sumArr.sort((a, b) => a - b);
        return sorted[0] + sorted[sorted.length - 1];
      };
      if (sum > invalidNumber) {
        sum = 0;
        sumArr = []
        break;
      }
    }
  }
}

console.log(`Part 2 - ${findSumOfInvalidRange(xmasCode)}`);
