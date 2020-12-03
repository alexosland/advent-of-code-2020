import fs from 'fs';

const input: String = fs.readFileSync('data/input.txt', 'utf-8');
const routeMap: string[][] = input.split('\n').map((line) => line.split(''));

type Location = {
    x: number,
    y: number,
}

const moveToboggan = (tobogganLocation: Location, vector: [number, number]): Location => ({
    x: (tobogganLocation.x + vector[0]) % (routeMap[tobogganLocation.y].length),
    y: Math.min(tobogganLocation.y + vector[1], routeMap.length - 1)
});

const countTreesOnSlope = (moveVector: [number, number]): number => {
    let tobogganLocation: Location = { x: 0, y: 0 };
    let treeCount = 0;
    while (tobogganLocation.y < routeMap.length - 1) {
        tobogganLocation = moveToboggan(tobogganLocation, moveVector);
        if (routeMap[tobogganLocation.y][tobogganLocation.x] === '#') treeCount += 1;
    }
    return treeCount;
}

// part 1
const moveVector: [number, number] = [3, 1];
console.log(`Part1 - Trees encountered: ${countTreesOnSlope(moveVector)}`);

// part 2
const moveVectors: [number, number][] = [[1, 1],[3, 1],[5, 1],[7, 1], [1, 2]];
const multiplySlopeEncounters = (moveVectors: [number, number][]): number => moveVectors.reduce((total: number, moveVector: [number, number]) => total * countTreesOnSlope(moveVector), 1);
console.log(`Part2 - Multiplied trees: ${multiplySlopeEncounters(moveVectors)}`);

