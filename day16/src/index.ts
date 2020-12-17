import fs from 'fs';

const input: String = fs.readFileSync('data/input.txt', 'utf-8');
const dataSections: string [] = input.split('\n\n');

const parseRules = (rulesRaw: string): Map<string, Function> => {
    const rules = new Map();
    rulesRaw.split('\n').forEach((rule: string) => {
        const [ruleName, rangesRaw]: string[] = rule.split(':');
        const ranges: number[][] = rangesRaw.split('or').map((range: string) => (range.trim().split('-').map(Number)));
        const validate = (fieldValue: number): boolean => {
           return (fieldValue >= ranges[0][0] && fieldValue <= ranges[0][1]) ||  (fieldValue >= ranges[1][0] && fieldValue <= ranges[1][1]) 
        }
        rules.set(ruleName, validate);
    })
    return rules;
}

const ticketRules = parseRules(dataSections[0]);
const myTicket: number[] = dataSections[1].split('\n')[1].split(',').map(Number);

const nearbyTicketsRaw = dataSections[2].split('\n');
nearbyTicketsRaw.shift();
const nearbyTickets: number[][] = nearbyTicketsRaw.map((ticket: string) => ticket.split(',').map(Number))


const sumInvalidNearbyFields = (rules: Map<string, Function>, nearbyTickets: number[][]): number =>
    nearbyTickets.reduce((sum: number, ticket: number[]): number => {
        ticket.forEach((field: number) => {
            const validators = Array.from(rules.values());
            if (!validators.some((validate) => validate(field))) {
                sum += field;
            }
        })
        return sum;
    }, 0);

console.log(`Part 1 - ${sumInvalidNearbyFields(ticketRules, nearbyTickets)}`)

const removeInvalidTickets = (rules: Map<string, Function>, nearbyTickets: number[][]): number[][] => 
    nearbyTickets.filter((ticket: number[]) => 
        ticket.every((field: number) => {
            const validators = Array.from(rules.values());
            return validators.some((validate) => validate(field))
        })
    );

const findFieldIndices = (ticketRules: Map<string, Function>, validTickets: number[][]): Map<string, number> => {
    const ticketLength = validTickets[0].length
    const fieldIndices = new Map();
    
    while (fieldIndices.size < ticketRules.size) {
        ticketRules.forEach((validate: Function, fieldName: string) => {
            let possibleIndicies = [];
            for (let i = 0; i < ticketLength; i++) {
                const allFieldsValidAtIndex = validTickets.every((ticket: number[]) => {
                    const field = ticket[i];
                    const isValid = validate(field);
                    return isValid;
                })
                if (allFieldsValidAtIndex && !Array.from(fieldIndices.values()).includes(i)) {
                    possibleIndicies.push(i);              
                }
            }
            if (possibleIndicies.length === 1) {
                fieldIndices.set(fieldName, possibleIndicies[0]);
            }
        });
    }

    return fieldIndices;
}

const getTicketDepartureSum = (ticket: number[], fieldIndices: Map<string, number>) => {
    let product: number | null = null;
    fieldIndices.forEach((index, fieldName) => {
        if (fieldName.includes('departure')) {
            product = product ? ticket[index] * product : ticket[index]; 
        }
    })
    return product;
}

const validTickets = removeInvalidTickets(ticketRules, nearbyTickets);
const fieldIndices = findFieldIndices(ticketRules, validTickets);

console.log(`Part 2 - ${getTicketDepartureSum(myTicket, fieldIndices)}`);