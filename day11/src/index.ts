import fs from 'fs';

const input: String = fs.readFileSync('data/input.txt', 'utf-8');
const seatingMap: string[][] = input.split('\n').map((row: string) => row.split(''));

enum SeatType {
  empty = 'L',
  floor = '.',
  occupied = '#',
}
const countAdjacentOccupiedSeats = (seatingMap: string[][], seatId: [number, number], ignoreFloor: boolean): number => {
  let occupied = 0;
  for (let i = Math.max(0, seatId[0] - 1); i <= Math.min(seatId[0] + 1, seatingMap.length - 1); i += 1) {
    for (let j = Math.max(0, seatId[1] - 1); j <= Math.min(seatId[1] + 1, seatingMap[i].length -1); j += 1) {
      if (i !== seatId[0] || j !== seatId[1]) {
        let seat = seatingMap[i][j];
        if (ignoreFloor && seat === SeatType.floor) {
          seat = findNextSeat(seatingMap, seatId, [Math.sign(i - seatId[0]), Math.sign(j - seatId[1])]);
        }
        occupied += seat === SeatType.occupied ? 1 : 0;
      }
    }
  }
  return occupied;
}

const applySeatingRound = (seatingMap: string[][], ignoreFloor: boolean, leaveSeatThreshold: number): [string[][], number] => {
  const newSeatingMap = [...seatingMap.map((row) => [...row])];
  let numberOfOccupiedSeats = 0;
  for (let row = 0; row < seatingMap.length; row += 1) {
    for (let col = 0; col < seatingMap[row].length; col += 1) {
      const seat = seatingMap[row][col];
      if (seat === SeatType.floor) continue;
      if (seat === SeatType.occupied) numberOfOccupiedSeats++;
      const adjacentOccupiedSeats = countAdjacentOccupiedSeats(seatingMap, [row, col], ignoreFloor);
      if (seat === SeatType.empty && adjacentOccupiedSeats === 0) {
        newSeatingMap[row][col] = SeatType.occupied;
        numberOfOccupiedSeats ++;
      }
      if (seat === SeatType.occupied && adjacentOccupiedSeats >= leaveSeatThreshold) {
        newSeatingMap[row][col] = SeatType.empty;
        numberOfOccupiedSeats --;
      }
    }
  }
  return [newSeatingMap, numberOfOccupiedSeats];
}

const findStableSeatingPosition = (seatingMap: string[][], ignoreFloor = false, leaveSeatThreshold = 4) => {
  let previousOccupiedSeats = undefined;
  let [newSeatingMap, numberOfOccupiedSeats] = [seatingMap, 0];
  while (numberOfOccupiedSeats !== previousOccupiedSeats) {
    previousOccupiedSeats = numberOfOccupiedSeats;
    [newSeatingMap, numberOfOccupiedSeats] = applySeatingRound(newSeatingMap, ignoreFloor, leaveSeatThreshold);
  }
  return numberOfOccupiedSeats;
}

console.log(`Part 1 - ${findStableSeatingPosition(seatingMap)}`);

const findNextSeat = (seatingMap: string[][], seatId: [number, number], checkVector: [number, number]): string => {
  let seat = seatingMap[seatId[0]][seatId[1]]
  let nextSeatId = [seatId[0] + checkVector[0], seatId[1] + checkVector[1]];
  while (nextSeatId[0] >= 0 && nextSeatId[0] < seatingMap.length && nextSeatId[1] >= 0 && nextSeatId[1] < seatingMap[nextSeatId[0]].length) {
    seat = seatingMap[nextSeatId[0]][nextSeatId[1]];
    if (seat !== SeatType.floor) break;
    nextSeatId = [nextSeatId[0] + checkVector[0], nextSeatId[1] + checkVector[1]]
  }
  return seat;
};

console.log(`Part 2 - ${findStableSeatingPosition(seatingMap, true, 5)}`);