import { RomanNumerals } from './romanNumerals.ts';

describe('Roman numerals', () => {
  const romanNumerals = new RomanNumerals();
  it('Should return III when 3', () => {
    const decimal = 3;

    const romanNumeral = romanNumerals.convertDecimalToRomanNumeral(decimal);

    expect(romanNumeral).toBe('III');
  });
  it('Should return IV when 4', () => {
    const decimal = 4;

    const romanNumeral = romanNumerals.convertDecimalToRomanNumeral(decimal);

    expect(romanNumeral).toBe('IV');
  });
  it('Should return IX when 9', () => {
    const decimal = 9;

    const romanNumeral = romanNumerals.convertDecimalToRomanNumeral(decimal);

    expect(romanNumeral).toBe('IX');
  });
  it('Should return X when 10', () => {
    const decimal = 10;

    const romanNumeral = romanNumerals.convertDecimalToRomanNumeral(decimal);

    expect(romanNumeral).toBe('X');
  });
  it('Should return XIV when 14', () => {
    const decimal = 14;

    const romanNumeral = romanNumerals.convertDecimalToRomanNumeral(decimal);

    expect(romanNumeral).toBe('XIV');
  });
  it('Should return XIV when 14', () => {
    const decimal = 14;

    const romanNumeral = romanNumerals.convertDecimalToRomanNumeral(decimal);

    expect(romanNumeral).toBe('XIV');
  });
  it('Should return XCIX when 99', () => {
    const decimal = 99;

    const romanNumeral = romanNumerals.convertDecimalToRomanNumeral(decimal);

    expect(romanNumeral).toBe('XCIX');
  });
  it('Should return CDXLIX when 449', () => {
    const decimal = 449;

    const romanNumeral = romanNumerals.convertDecimalToRomanNumeral(decimal);

    expect(romanNumeral).toBe('CDXLIX');
  });
  it('Should return CMXCIX when 999', () => {
    const decimal = 999;

    const romanNumeral = romanNumerals.convertDecimalToRomanNumeral(decimal);

    expect(romanNumeral).toBe('CMXCIX');
  });
  it('Should return M when 1000', () => {
    const decimal = 1000;

    const romanNumeral = romanNumerals.convertDecimalToRomanNumeral(decimal);

    expect(romanNumeral).toBe('M');
  });
  it('Should return MMMXC when 3090', () => {
    const decimal = 3090;

    const romanNumeral = romanNumerals.convertDecimalToRomanNumeral(decimal);

    expect(romanNumeral).toBe('MMMXC');
  });
  it('Should return MMMCDXLIX when 3449', () => {
    const decimal = 3449;

    const romanNumeral = romanNumerals.convertDecimalToRomanNumeral(decimal);

    expect(romanNumeral).toBe('MMMCDXLIX');
  });
  it('Should return MMMCMXCIX when 3999', () => {
    const decimal = 3999;

    const romanNumeral = romanNumerals.convertDecimalToRomanNumeral(decimal);

    expect(romanNumeral).toBe('MMMCMXCIX');
  });
  it('Should throw if decimal above 3999', () => {
    const decimal = 4000;

    expect(() => romanNumerals.convertDecimalToRomanNumeral(decimal)).toThrow();
  });
});
