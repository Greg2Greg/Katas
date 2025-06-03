import {
  assertRomanNumeralIsInValidRange,
  assertNumberIsDigit,
  assertNumberIsDigitForThousand,
  Digit,
} from './utils.ts';

/*
 Cette version répond à la problématique métier. Mais en réalité, elle n'est pas
 "évolutive". Si demain un nouveau nombre romain, par exemple "Z" était créé, 
 il faudrait rajouter une fonction, définir le retour de la fonction etc.

 Voir V2 pour une solution plus élégante
*/
export class RomanNumeralsV1 {
  convertDecimalToRomanNumeral(decimal: number): string {
    assertRomanNumeralIsInValidRange(decimal);

    const decimalLength = decimal.toString().length;

    let romanNumeral = '';
    for (let digitPosition = 0; digitPosition < decimalLength; digitPosition++) {
      const digitEvaluatedStartingFromRight = parseInt(
        decimal.toString().slice(decimalLength - 1 - digitPosition, decimalLength - digitPosition)
      );

      assertNumberIsDigit(digitEvaluatedStartingFromRight);
      const lookup = {
        [0]: this.computeRomanNumeralUnitsToDecimal(digitEvaluatedStartingFromRight),
        [1]: this.computeRomanNumeralTensToDecimal(digitEvaluatedStartingFromRight),
        [2]: this.computeRomanNumeralHundredsToDecimal(digitEvaluatedStartingFromRight),
        [3]: this.computeRomanNumeralThousandsToDecimal(digitEvaluatedStartingFromRight),
      };

      romanNumeral = lookup[digitPosition as 0 | 1 | 2 | 3] + romanNumeral;
    }

    return romanNumeral;
  }

  private computeRomanNumeralThousandsToDecimal(unit: number): '' | 'M' | 'MM' | 'MMM' {
    assertNumberIsDigitForThousand(unit);

    const convertTable = {
      [0]: '',
      [1]: 'M',
      [2]: 'MM',
      [3]: 'MMM',
    } as const;

    return convertTable[unit];
  }

  private computeRomanNumeralHundredsToDecimal(
    unit: Digit
  ): '' | 'C' | 'CC' | 'CCC' | 'CD' | 'D' | 'DC' | 'DCC' | 'DCCC' | 'CM' {
    const convertTable = {
      [0]: '',
      [1]: 'C',
      [2]: 'CC',
      [3]: 'CCC',
      [4]: 'CD',
      [5]: 'D',
      [6]: 'DC',
      [7]: 'DCC',
      [8]: 'DCCC',
      [9]: 'CM',
    } as const;

    return convertTable[unit];
  }

  private computeRomanNumeralTensToDecimal(
    unit: Digit
  ): '' | 'X' | 'XX' | 'XXX' | 'XL' | 'L' | 'LX' | 'LXX' | 'LXXX' | 'XC' {
    const convertTable = {
      [0]: '',
      [1]: 'X',
      [2]: 'XX',
      [3]: 'XXX',
      [4]: 'XL',
      [5]: 'L',
      [6]: 'LX',
      [7]: 'LXX',
      [8]: 'LXXX',
      [9]: 'XC',
    } as const;

    return convertTable[unit];
  }

  private computeRomanNumeralUnitsToDecimal(
    unit: Digit
  ): '' | 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII' | 'VIII' | 'IX' {
    const convertTable = {
      [0]: '',
      [1]: 'I',
      [2]: 'II',
      [3]: 'III',
      [4]: 'IV',
      [5]: 'V',
      [6]: 'VI',
      [7]: 'VII',
      [8]: 'VIII',
      [9]: 'IX',
    } as const;

    return convertTable[unit];
  }
}
