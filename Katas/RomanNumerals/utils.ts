export type Digit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type DigitStringified = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export type ThousandDigit = Extract<Digit, 0 | 1 | 2 | 3>;

export function assertNumberIsDigit(number: number): asserts number is Digit {
  if (number < 0 || number > 9) {
    throw new Error('Number should be a digit');
  }
}

export function assertNumberIsDigitForThousand(number: number): asserts number is ThousandDigit {
  if (number < 0 || number > 3) {
    throw new Error('Number should be a digit');
  }
}

export function assertRomanNumeralIsInValidRange(decimal: number): void {
  if (decimal < 1 || decimal > 3999) {
    throw new Error('Roman numerals valid range is 1 - 3999');
  }
}
