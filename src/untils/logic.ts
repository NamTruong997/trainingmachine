import _ from "lodash";

function randomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateData() {
  let rxLeft = randomNum(3, 15);
  let rxRight1 = randomNum(1, 9);
  let rxRight2 = randomNum(1, 9);
  let rxRight3 = randomNum(1, 9);
  let rxRight4 = randomNum(1, 9);

  let screenDefault = {
    rxLeft,
    rxRight1,
    rxRight2,
    rxRight3,
    rxRight4,
    txLeft: rxLeft,
    txRight1: 0,
    txRight2: 0,
    txRight3: 0,
    txRight4: 0,
    mode: randomNum(0, 3),
    watt: Math.random() < 0.5,
  };
  return screenDefault;
}

export function getNumber(min: number, max: number, up: boolean, value: any) {
  let arr = _.range(min, max +1, 1);
  let newVal = up ? value + 1 : value -1;
  let defaultVal = up ? min : max;
  return arr[newVal -min] || defaultVal;
}

export function getRange(name: string) {
  if (name === "rxLeft" || name === "txLeft") {
    return {
      min: 3,
      max: 15,
    };
  }
  return {
    min: 1,
    max: 9,
  };
}
