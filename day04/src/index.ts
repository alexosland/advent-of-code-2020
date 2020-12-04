import fs from 'fs';

const input: String = fs.readFileSync('data/input.txt', 'utf-8');
const passports = input.split('\n\n').map((passport: string) => passport.split(/\s+/));

enum RequiredField {
	byr = 'byr',
	iyr = 'iyr',
	eyr = 'eyr',
	hgt = 'hgt',
	hcl = 'hcl',
	ecl = 'ecl',
	pid = 'pid',
}

// part 1
const isValidPassport1 = (passport: string[]): boolean => {
    const passportFields = passport.map((line) => line.split(':')[0]);
    const isValid: boolean = Object.values(RequiredField).every((field) => passportFields.includes(field));
    return isValid;
}
const validPassportCount1 = passports.reduce((validCount, passport) => (isValidPassport1(passport) ? validCount + 1 : validCount), 0);
console.log(`Part 1 - valid passports: ${validPassportCount1}`);

// part 2
const fieldValidators = {
    byr: (byr: string) => parseInt(byr,10) >= 1920 && parseInt(byr,10) <= 2020,
    iyr: (iyr: string) => parseInt(iyr,10) >= 2010 && parseInt(iyr,10) <= 2020,
    eyr: (eyr: string) => parseInt(eyr,10) >= 2020 && parseInt(eyr,10) <= 2030,
    hgt: (hgt: string) => {
        const unit: string = hgt.slice(-2);
        const value: string = hgt.split(unit)[0];
        if (unit === 'cm') return parseInt(value,10) >= 150 && parseInt(value,10) <= 193;
        if (unit === 'in') return parseInt(value,10) >= 59 && parseInt(value,10) <= 76;
        return false;
    },
    hcl: (value: string) => /^#([0-9a-f]){6}$/.test(value),
    ecl: (value: string) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value),
    pid: (value: string) => /^[0-9]{9}$/.test(value),
}

const isValidPassport2 = (passport: string[]): boolean => {
    const passportFieldValues: string[][] = passport.map((line: string) => line.split(':'));
    const isValid: boolean = Object.values(RequiredField).every((field: string) => {
        const fieldValue = passportFieldValues.find((fv: string[]) => field === fv[0]);       
        return  fieldValue && fieldValidators[field as RequiredField](fieldValue[1]);
    });
    return isValid;
}

const validPassportCount2 = passports.reduce((validCount, passport) => (isValidPassport2(passport) ? validCount + 1 : validCount), 0);
console.log(`Part 2 - valid passports: ${validPassportCount2}`);

