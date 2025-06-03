import { assertRomanNumeralIsInValidRange, Digit } from './utils.ts';

const decimalToRoman = {
  1: 'I',
  5: 'V',
  10: 'X',
  50: 'L',
  100: 'C',
  500: 'D',
  1000: 'M',
};

type DecimalRepresentationOfRomanNumerals = keyof typeof decimalToRoman;

/*
 Contrairement à la V1, si demain un chiffre romain "Z" émerge, il suffirait
 de l'ajouter dans l'objet decimalToRoman et d'augmenter le range de validité.
 Soit 2 lignes de code.
*/
export class RomanNumeralsV2 {
  convertDecimalToRomanNumeral(decimal: number) {
    assertRomanNumeralIsInValidRange(decimal);

    let result = '';
    const decimalLength = decimal.toString().length;

    for (let digitPosition = 0; digitPosition < decimalLength; digitPosition++) {
      const digitEvaluated = parseInt(
        decimal.toString().slice(decimalLength - 1 - digitPosition, decimalLength - digitPosition)
      );

      const decimalDigitToCompute = Math.pow(10, digitPosition) as DecimalRepresentationOfRomanNumerals;

      const lookup = {
        [0]: '',
        [1]: decimalToRoman[decimalDigitToCompute],
        [2]: decimalToRoman[decimalDigitToCompute] + decimalToRoman[decimalDigitToCompute],
        [3]:
          decimalToRoman[decimalDigitToCompute] +
          decimalToRoman[decimalDigitToCompute] +
          decimalToRoman[decimalDigitToCompute],
        [4]:
          decimalToRoman[decimalDigitToCompute] +
          decimalToRoman[(5 * decimalDigitToCompute) as DecimalRepresentationOfRomanNumerals],
        [5]: decimalToRoman[(5 * decimalDigitToCompute) as DecimalRepresentationOfRomanNumerals],
        [6]:
          decimalToRoman[(5 * decimalDigitToCompute) as DecimalRepresentationOfRomanNumerals] +
          decimalToRoman[decimalDigitToCompute],
        [7]:
          decimalToRoman[(5 * decimalDigitToCompute) as DecimalRepresentationOfRomanNumerals] +
          decimalToRoman[decimalDigitToCompute] +
          decimalToRoman[decimalDigitToCompute],
        [8]:
          decimalToRoman[(5 * decimalDigitToCompute) as DecimalRepresentationOfRomanNumerals] +
          decimalToRoman[decimalDigitToCompute] +
          decimalToRoman[decimalDigitToCompute] +
          decimalToRoman[decimalDigitToCompute],
        [9]:
          decimalToRoman[decimalDigitToCompute] +
          decimalToRoman[(10 * decimalDigitToCompute) as DecimalRepresentationOfRomanNumerals],
      };

      result = lookup[digitEvaluated as Digit] + result;
    }

    return result;
  }
}
