import fs from 'fs';

const input: String = fs.readFileSync('data/input.txt', 'utf-8');
const pocketDimension: string [][][] = input.split('\n').map((x) => x.split('').map((y) => [y]));

console.log(pocketDimension);

const getAdjacentCubes = ((x: number, y: number, z: number): Set<number[]> => {
    const searchDepth = [-1, 0, 1];
    const adjacentCubes: Set<number[]> = new Set();
    for (const dx of searchDepth) {
        for (const dy of searchDepth) {
            for (const dz of searchDepth) {
                if (dx === x && dy === y && dz === 0) continue;
                adjacentCubes.add([x + dx, y + dy, z + dz]);
            }
        }
    }
    return adjacentCubes;
});


const cycle = (pocketDimension: string[][][]) => {
    for (const x: number in pocketDimension) {
        for (const y: number in pocketDimension[x]) {
            for (const z: number in pocketDimension[x][y]) {
                const adjacentCubes = getAdjacentCubes(x, y z);
            }
        }
    }
}