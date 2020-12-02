import fs from 'fs';

const input: String = fs.readFileSync('data/input.txt', 'utf-8');
const lines: string[] = input.split('\n');

// part 1
const isValidPassword1 = (password: string, requiredChar: string, minCount: number, maxCount: number): boolean => {
    let charCount: number = 0;
    for (let i = 0; i < password.length; i++) {
        if (password[i] === requiredChar) charCount += 1;
        if (charCount > maxCount) break;
    }
    return minCount <= charCount && charCount <= maxCount;
}

const countValidPasswords1 = () => {
    let total = 0;
    lines.forEach((line) => {
        const data: string[] = line.split(' ');
        const policyBounds: string[] = data[0].split('-');
        const minCount: number = parseInt(policyBounds[0], 10);
        const maxCount: number = parseInt(policyBounds[1], 10);
        const requiredChar: string = data[1][0];
        const password: string = data[2];
        if (isValidPassword1(password, requiredChar, minCount, maxCount)) {
            total += 1;
        }
    })
    return total;
}

console.log(`Valid Passwords (part 1): ${countValidPasswords1()}`);

// part 2
const isValidPassword2 = (password: string, requiredChar: string, index1: number, index2: number): boolean => {
    return (password[index1] === requiredChar && password[index2] !== requiredChar) || (password[index1] !== requiredChar && password[index2] === requiredChar);
}

const countValidPasswords2 = () => {
    let total = 0;
    lines.forEach((line) => {
        const data: string[] = line.split(' ');
        const policyBounds: string[] = data[0].split('-');
        const index1: number = parseInt(policyBounds[0], 10) - 1;
        const index2: number = parseInt(policyBounds[1], 10) - 1;
        const requiredChar: string = data[1][0];
        const password: string = data[2];
        if (isValidPassword2(password, requiredChar, index1, index2)) {
            total += 1;
        }
    })
    return total;
}

console.log(`Valid Passwords (part 2): ${countValidPasswords2()}`);