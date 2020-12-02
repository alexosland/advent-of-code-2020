import fs from 'fs';

const input: String = fs.readFileSync('data/input.txt', 'utf-8');
const target: number = 2020;

const sortedVales: number[] = input.split('\n').map((stringVal: String) => parseInt(stringVal as string, 10)).sort((a: number, b: number) => (a - b));

// part 1
const findTargetAndMultiply = (): number => {
    for (let i = 0; i < sortedVales.length; i++) {
        const numericVal1: number = sortedVales[i];
        for (let j = i + 1; j <= sortedVales.length; j++) {
            const numericVal2: number = sortedVales[j];
            let testAnswer: number = numericVal1 + numericVal2;
            if (testAnswer === target) {
                return numericVal1 * numericVal2;
            }
            if (testAnswer > target) break;
        }
    }
    return -1;
}

// part 2
const findTargetWithTriple = (): number => {
    for (let i = 0; i < sortedVales.length - 2; i++) {
        const numericVal1: number = sortedVales[i];
        for (let j = i + 1; j < sortedVales.length - 1; j++) {
            const numericVal2: number = sortedVales[j];
            for (let k = j + 1; k < sortedVales.length; k++) {
                const numericVal3: number = sortedVales[k];
                let testAnswer: number = numericVal1 + numericVal2 + numericVal3;
                if (testAnswer === target) {
                    return numericVal1 * numericVal2 * numericVal3;
                }
                if (testAnswer > target) break;
            }
        }
    }
    return -1;
}

const answer1 = findTargetAndMultiply();
const answer2 = findTargetWithTriple();

console.log(`part1: ${answer1}, part2: ${answer2}`);