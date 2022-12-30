export const OK_EMOJI = 'O';
export const ALMOST_EMOJI = '|';
export const MISS_EMOJI = 'X';

export type Result = {
  number: string;
  correct: number;
  almost: number;
  miss: number;
  emoji: string;
}

function range(max: number) {
  return [...Array(max).keys()];
}

export function randomIntegerBetween(min = 0, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function randomSecretNumber(min = 0, max=9999) {
  return String(randomIntegerBetween(min, max)).padStart(4, '0');
}

function pickRandom(list: number[]) {
  return list[randomIntegerBetween(0, list.length)];
}

export function randomSecretNumberWithoutRepeat() {
  const digits = range(10);
  let secretNumber = "";
  while(secretNumber.length < 4) {
    const newDigit = String(pickRandom(digits));
    if(secretNumber.includes(newDigit)) {
      continue;
    }
    secretNumber += newDigit;
  }
  return secretNumber;
}

export function is4Digits(text: string) {
  return text.match(/^\d{4}$/) !== null;
}

export function tryNumber(number: string, secretNumber: string) {
  const result: Result = {
    number,
    correct: 0,
    almost: 0,
    miss: 0,
    emoji: '',
  };
  [...number].forEach((digit, i) => {
    if(digit === secretNumber[i]) {
      result.correct++;
      result.emoji += OK_EMOJI;
    } else if(secretNumber.includes(digit)) {
      result.almost++;
      result.emoji += ALMOST_EMOJI;
    } else {
      result.miss++;
      result.emoji += MISS_EMOJI;
    }
  });
  return result;
}

export function formatResult(result: Result) {
  return `${result.correct}B ${result.almost}R ${result.miss}M`;
}
