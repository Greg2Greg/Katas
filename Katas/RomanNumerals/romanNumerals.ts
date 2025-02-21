export class RomanNumerals {
  convertDecimalToRomanNumeral(decimal: number): string {
    if (decimal < 1 || decimal > 3999) {
      throw new Error('Roman numerals valid range is 1 - 3999');
    }

    const decimalLength = decimal.toString().length;
    let romanNumeral = '';

    for (let digitPosition = 0; digitPosition < decimalLength; digitPosition++) {
      const digitEvaluatedStartingFromRight = parseInt(
        decimal.toString().slice(decimalLength - 1 - digitPosition, decimalLength - digitPosition)
      );

      if (digitPosition === 0) {
        romanNumeral = this.computeUnits(digitEvaluatedStartingFromRight);
      } else if (digitPosition === 1) {
        romanNumeral = this.computeTens(digitEvaluatedStartingFromRight) + romanNumeral;
      } else if (digitPosition === 2) {
        romanNumeral = this.computeHundreds(digitEvaluatedStartingFromRight) + romanNumeral;
      } else if (digitPosition === 3) {
        romanNumeral = this.computeThousands(digitEvaluatedStartingFromRight) + romanNumeral;
      }
    }

    return romanNumeral;
  }

  private computeThousands(unit: number): '' | 'M' | 'MM' | 'MMM' {
    if (unit === 0) {
      return '';
    }
    if (unit === 1) {
      return 'M';
    } else if (unit === 2) {
      return 'MM';
    }
    return 'MMM';
  }

  private computeHundreds(unit: number): '' | 'C' | 'CC' | 'CCC' | 'CD' | 'D' | 'DC' | 'DCC' | 'DCCC' | 'CM' {
    if (unit === 0) {
      return '';
    }
    if (unit === 1) {
      return 'C';
    } else if (unit === 2) {
      return 'CC';
    } else if (unit === 3) {
      return 'CCC';
    } else if (unit === 4) {
      return 'CD';
    } else if (unit === 5) {
      return 'D';
    } else if (unit === 6) {
      return 'DC';
    } else if (unit === 7) {
      return 'DCC';
    } else if (unit === 8) {
      return 'DCCC';
    }
    return 'CM';
  }

  private computeTens(unit: number): '' | 'X' | 'XX' | 'XXX' | 'XL' | 'L' | 'LX' | 'LXX' | 'LXXX' | 'XC' {
    if (unit === 0) {
      return '';
    }
    if (unit === 1) {
      return 'X';
    } else if (unit === 2) {
      return 'XX';
    } else if (unit === 3) {
      return 'XXX';
    } else if (unit === 4) {
      return 'XL';
    } else if (unit === 5) {
      return 'L';
    } else if (unit === 6) {
      return 'LX';
    } else if (unit === 7) {
      return 'LXX';
    } else if (unit === 8) {
      return 'LXXX';
    }
    return 'XC';
  }

  private computeUnits(unit: number): '' | 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII' | 'VIII' | 'IX' {
    if (unit === 0) {
      return '';
    } else if (unit === 1) {
      return 'I';
    } else if (unit === 2) {
      return 'II';
    } else if (unit === 3) {
      return 'III';
    } else if (unit === 4) {
      return 'IV';
    } else if (unit === 5) {
      return 'V';
    } else if (unit === 6) {
      return 'VI';
    } else if (unit === 7) {
      return 'VII';
    } else if (unit === 8) {
      return 'VIII';
    }
    return 'IX';
  }
}
