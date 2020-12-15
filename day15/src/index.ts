import fs from 'fs';

const input: String = fs.readFileSync('data/input.txt', 'utf-8');
const data: string[] = input.split(',');

const startingSequence = data.map((n) => parseInt(n, 10));

const playGame = (startingSequence: number[], turnLimit: number  = 2020) => {
    let lastValue = startingSequence.pop() || Infinity
    const game = new Map(startingSequence.map((n , i) => [n, i + 1]));
    for (let turnNumber = startingSequence.length + 1; turnNumber < turnLimit; turnNumber++) {
        if (game.has(lastValue)) {
            const lastSpoken: number = game.get(lastValue) || 0
            game.set(lastValue, turnNumber);
            lastValue = turnNumber - lastSpoken;
        } else {
            game.set(lastValue, turnNumber);
            lastValue = 0;
        }
    }
    return lastValue;
}

console.log(`Part 1 - ${playGame([...startingSequence], 2020)}`);

console.log(`Part 2 - ${playGame([...startingSequence], 30000000)}`);