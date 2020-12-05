import fs from 'fs';

const input: String = fs.readFileSync('data/input.txt', 'utf-8');
const boardingPasses: string[] = input.split('\n');

const findSeatId = (boardingPass: string): number => {
    const boardingPassArray = boardingPass.split('');
    const binarySeatId = boardingPassArray.map((char) => char === 'F' || char === 'L' ? '0' : '1').join('');
    return parseInt(binarySeatId, 2);
}

// part 1
const findMaxSeatId = (boardingPasses: string[]): number => (
    boardingPasses.reduce((maxSeatId: number, boardingPass: string) => (
        Math.max(maxSeatId, findSeatId(boardingPass))
    ), 0)
);
console.log(`Part 1 - ${findMaxSeatId(boardingPasses)}`);

// part 2
const findMissingSeatId = (boardingPasses: string[]): number => {
    const sortedSeatIds: number[] = boardingPasses
        .map((boardingPass) => findSeatId(boardingPass))
        .sort((a, b) => (a-b));
    const seatInFront = sortedSeatIds.find((seatId, i, seatIds) => (seatId + 1) !== seatIds[i + 1])
    return seatInFront as number + 1;
}
console.log(`Part 2 - ${findMissingSeatId(boardingPasses)}`);