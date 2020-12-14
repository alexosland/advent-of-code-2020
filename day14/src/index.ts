import fs from 'fs';

const input: String = fs.readFileSync('data/input.txt', 'utf-8')

const applyMask = (value: string, mask: string) => {
    return value.split('').map((bit, i) => {
        if (mask[i] !== 'X') return mask[i];
        return bit;
    }).join('');
}
const sumMaskedInputs = () => {
    let data: string[] = input.toString().split('\n');
    let mask = '';
    const instructionSet = new Map<string, number>();
    data.forEach((instructionString: string) => {
        const instruction = instructionString.split('=');
        if (instruction[0].includes('mask')) {
            mask = instruction[1].trim().split('').reduce((mask: string, bit: string, i: number) => {
                if (bit === 'X' && mask.length || bit !== 'X') mask += bit;
                return mask;
            }, '');
        } else {
            const memoryIndex = instruction[0].substring(
                instruction[0].indexOf('[') + 1,
                instruction[0].indexOf(']')
            );
            const value = parseInt(instruction[1].trim(), 10).toString(2);
            const paddedValue = value.padStart(mask.length, '0');
            const maskedValue = applyMask(paddedValue, mask);
            instructionSet.set(memoryIndex, parseInt(maskedValue, 2));
        }
    });
    return Array.from(instructionSet.values()).reduce((a: number, b: number) => (a + b));
}

console.log(`Part 1 - ${sumMaskedInputs()}`)

const sumMaskedInputs2 = () => {
    let data: string[] = input.toString().split('\n');
    let mask = '';
    const instructionSet = new Map<number, number>();
    data.forEach((instructionString: string) => {
        const instruction = instructionString.split('=');
        if (instruction[0].includes('mask')) {
            mask = instruction[1].trim();
        } else {
            const memoryLoc = instruction[0].substring(
                instruction[0].indexOf('[') + 1,
                instruction[0].indexOf(']')
            );
            const value = parseInt(instruction[1].trim(), 10);
            const binaryMemoryLoc = parseInt(memoryLoc, 10).toString(2);
            const paddedMemoryLoc = binaryMemoryLoc.padStart(mask.length, '0');
            const maskedMemoryLocations = calculatePossibleAddresses(paddedMemoryLoc, mask);
            maskedMemoryLocations.forEach((loc: number) => {    
                instructionSet.set(loc, value);
            });
        }
    });
    return Array.from(instructionSet.values()).reduce((a: number, b: number) => (a + b));
}

const calculatePossibleAddresses = (memoryLocation: string, mask: string): number[] => {
    const floatingIndices: number[] = [];
    const maskedBits: string[] =  memoryLocation.split('').map((bit, i) => {
        let maskedBit = bit;
        if (mask[i] === '1' || mask[i] === 'X') maskedBit = mask[i];
        if (mask[i] === 'X') {
            floatingIndices.push(i);
        }
        return maskedBit
    });
    if (floatingIndices.length <= 0) return [parseInt(maskedBits.join(''), 2)]
    const maskedMemoryLocations = [];
    for (let i = 0; i < Math.pow(2, floatingIndices.length); i++) {
        const binaryI = i.toString(2).padStart(floatingIndices.length, '0').split('');
        const memoryLocation = [...maskedBits];
        binaryI.forEach((floatingBit, idx) => {
            memoryLocation[floatingIndices[floatingIndices.length - idx - 1]] = floatingBit;
        })
        maskedMemoryLocations.push(parseInt(memoryLocation.join(''), 2));
    }
    return maskedMemoryLocations
}

console.log(`Part 2 - ${sumMaskedInputs2()}`);
