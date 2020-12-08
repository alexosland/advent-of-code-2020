import fs from 'fs';

const input: String = fs.readFileSync('data/input.txt', 'utf-8');
const instructionSet = input.split('\n').map((instruction) => {
  const commands = instruction.split(' ');
  return [commands[0], commands[1].slice(0,1), commands[1].slice(1)]
});

const runProgram = (instructionSet: string[][]) => {
  let pointer = 0;
  let accumulator = 0;
  const programMap = new Map();
  while (!programMap.has(pointer) && pointer < instructionSet.length) {
    const command = instructionSet[pointer];
    programMap.set(pointer, command);
    switch(command[0]) {
      case 'nop':
        pointer++;
        break;
      case 'acc':
        accumulator += command[1] === '+' ? parseInt(command[2],10) : -parseInt(command[2],10);
        pointer++
        break;
      case 'jmp':
        pointer += command[1] === '+' ? parseInt(command[2],10) : -parseInt(command[2],10);
        break;
    }
  }
  return [accumulator, pointer === instructionSet.length]
}

console.log(runProgram(instructionSet));

const fixProgram = (instructionSet: string[][]) => {
  let fixPointer = -1;
  let [accumulator, exitStatus] = runProgram(instructionSet);
  while(!exitStatus) {
    const newInstructionSet = instructionSet.map((command) => command.slice()); // deep copy
    fixPointer = newInstructionSet.findIndex((command, index) => (command[0] === 'jmp' || command[0] === 'nop') && index > fixPointer);
    const command = newInstructionSet[fixPointer];
    command[0] = command[0] === 'jmp' ? 'nop' : 'jmp';
    newInstructionSet[fixPointer] = command;
    [accumulator, exitStatus] = runProgram(newInstructionSet); 
  }
  return accumulator;

}
console.log(fixProgram(instructionSet))