import fs from 'fs';

const input: String = fs.readFileSync('data/input.txt', 'utf-8');
const boardingPasses: string[] = input.split('\n');

const MAX_ROWS = 127;
const MAX_COLS  = 7;

const findSeatId = (boardingPass: string): number => {
    const rowPartitions = boardingPass.slice(0, 7);
    const colPartitions = boardingPass.slice(-3);
    let rowMin = 0;
    let colMin = 0;
    let rowMax = MAX_ROWS;
    let colMax = MAX_COLS;
    for (let i = 0; i < rowPartitions.length; i++) {
        const rowStep = rowPartitions[i];
        if (rowStep === 'F') rowMax = Math.floor(rowMax - ((rowMax - rowMin) / 2));
        if (rowStep === 'B') rowMin = Math.ceil(rowMin + ((rowMax - rowMin) / 2));
    }
    for (let i = 0; i < colPartitions.length; i++) {
        const colStep = colPartitions[i];
        if (colStep === 'L') colMax = Math.floor(colMax - ((colMax - colMin) / 2));
        if (colStep === 'R') colMin = Math.ceil(colMin + ((colMax - colMin) / 2));
    }
    return (rowMax * 8) + colMin;

}

// part 1
const findMaxSeatId = (boardingPasses: string[]): number => boardingPasses.reduce((maxSeatId: number, boardingPass: string) => Math.max(maxSeatId, findSeatId(boardingPass)), 0);
console.log(`Part 1 - ${findMaxSeatId(boardingPasses)}`);

// part 2
const findMissingSeatId = (boardingPasses: string[]): number => {
    const sortedSeatIds: number[] = boardingPasses.map((boardingPass) => findSeatId(boardingPass)).sort((a, b) => (a-b));
    return sortedSeatIds.find((seatId, i, seatIds) => (seatId + 1) !== seatIds[i + 1]) as number + 1;
}
console.log(`Part 2 - ${findMissingSeatId(boardingPasses)}`);