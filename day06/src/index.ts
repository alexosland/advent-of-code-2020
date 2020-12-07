import fs from 'fs';

const input: String = fs.readFileSync('data/input.txt', 'utf-8');
const surveyGroups: string[][] = input.split('\n\n').map((group: string) => group.split(/\s+/));

const uniqueAnswers = surveyGroups.map((group: string[]) => {
    const uniqueGroupAnswers = new Set<string>();
    group.forEach((line) => {
        const answers = line.split('')
        answers.forEach((answer) => uniqueGroupAnswers.add(answer));
    })
    return uniqueGroupAnswers.size;
});

console.log(`Part 1 - ${uniqueAnswers.reduce((a, b) => a + b)}`);

const groupAnswers = surveyGroups.map((group: string[]) => {
  const answerCount = new Map();
  group.forEach((line) => {
    const answers = line.split('');
    answers.forEach((answer) => {
      const count = answerCount.get(answer);
      answerCount.set(answer, count ? count + 1 : 1);
    })
  })
  return Array.from(answerCount.entries()).reduce((acc, b) => b[1] === group.length ? acc + 1 : acc, 0);
})

console.log(`Part 2 - ${groupAnswers.reduce((a, b) => a + b)}`);