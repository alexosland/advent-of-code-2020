import fs from 'fs';

const input: String = fs.readFileSync('data/input.txt', 'utf-8');
const data = input.split('\n');

const earliestDeparture: number = parseInt(data[0],10);
const bustimes = data[1].split(',').reduce((times: number[], time: string) => {
  if (time !== 'x') {
    times.push(parseInt(time, 10));
  }
  return times;
}, []);

const getClosestMultiple = (target: number, base: number): number => {
  let current: number = base;
  while (current <= target) {
    current += base;
  }
  return current - target;
}

const findLowestWaitingTime = () => bustimes.reduce((answer: number[], time: number) => {
    const timeFromTarget = getClosestMultiple(earliestDeparture, time);
    return timeFromTarget < answer[0] ? [timeFromTarget, timeFromTarget * time] : answer; 
  }, [Infinity, -1]);



console.log(`Part 1 - ${findLowestWaitingTime()[1]}`);

/**
 * Looked up how to write chinese remainder theorem 
 */
const crt = () => {
  const bustimes = data[1].split(',').reduce((times: number[][], time: string, i: number) =>  {
    if (time !== 'x') {
      times.push([parseInt(time, 10), i]);
    }
    return times;   
  }, []);
  let n = 1;
  bustimes.forEach(([time, index]) => n *= time);
  const bnx = bustimes.map(([t, index], i ) => {
    const ni = BigInt(n / t);
    const b = i === 0 ? 0n : BigInt(t - index);
    const time = BigInt(t);
    const x = modInverse(ni, time - 2n, time);
    return ni * b * x;
  });
  let sum = bnx.reduce((acc, cur) => acc+ cur);
  return sum - (sum/BigInt(n))*BigInt(n)
}

const modInverse = (x: bigint, y: bigint, m: bigint) => {
  if (y === 0n) return 1n;

  let p: bigint = modInverse(x, y / 2n, m) % m;
  p = (p * p) % m;

  if (y % 2n === 0n) return p;
  return ((x * p) % m);
}

console.log(`Part 2 - ${crt()}`);
