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
  // add the final adapter jolt
  jolts.push(jolts[jolts.length - 1] + 3);
  /**
   * joltMap = Map<key, value>
   * key = jolt 
   * value = number of ways to get to this jolt from the charging outlet
   */
  const joltMap = new Map();

  // we start at the charging outlet so there is only one way to get there.
  joltMap.set(0, 1);

  /** 
   * for each jolt the number of ways we could have arrived at the current jolt 
   * is the sum of the number of ways we could have arrived at any previous jolts which lead to the current one
   * a previous jolt can only lead to the current jolt if it is within 3
   */ 
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
