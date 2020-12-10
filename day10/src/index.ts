import fs from 'fs';

const input: String = fs.readFileSync('data/input.txt', 'utf-8');
const jolts = input.split('\n').map((number: string) => parseInt(number)).sort((a, b) => a - b);

const getDifferencesProduct = () => {
  jolts.push(jolts[jolts.length - 1] + 3);
  jolts.unshift(0);
  const diff = jolts.map((jolt: number, i: number) => (jolts[i + 1] - jolt));
  const oneDiff = diff.filter((d) => d === 1);
  const threeDiff = diff.filter((d) => d === 3);
  return oneDiff.length * threeDiff.length;
}


console.log(`Part 1 - ${getDifferencesProduct()}`);

const getPossibleWays = () => {
  jolts.push(jolts[jolts.length - 1] + 3);
  const joltMap = new Map();

  joltMap.set(0, 1);

  jolts.forEach((jolt, i) => {
    const diff1 = joltMap.has(jolt - 1) ? joltMap.get(jolt - 1) : 0;
    const diff2 = joltMap.has(jolt - 2) ? joltMap.get(jolt - 2) : 0;
    const diff3 = joltMap.has(jolt - 3) ? joltMap.get(jolt - 3) : 0;
    const sumDiff = diff1 + diff2 + diff3;
    joltMap.set(jolt, joltMap.has(jolt) ? joltMap.get(jolt) + sumDiff : sumDiff);
  })
  return Array.from(joltMap)[joltMap.size-1][1];
};


console.log(`Part 2 - ${getPossibleWays()}`);
