import { RomanNumeralsV2 } from './romanNumeralsV2.ts';

const romanNumerals = new RomanNumeralsV2();
describe('Decimal to roman numerals', () => {
  it('Should return I when 1', () => {
    const decimal = 1;

    const romanNumeral = romanNumerals.convertDecimalToRomanNumeral(decimal);

    expect(romanNumeral).toBe('I');
  });
  it('Should return II when 2', () => {
    const decimal = 2;

    const romanNumeral = romanNumerals.convertDecimalToRomanNumeral(decimal);

    expect(romanNumeral).toBe('II');
  });
  it('Should return III when 3', () => {
    const decimal = 3;

    const romanNumeral = romanNumerals.convertDecimalToRomanNumeral(decimal);

    expect(romanNumeral).toBe('III');
  });
  // On ne peut pas parler de 4 sans la notion de 5, d'où ce test en premier
  it('Should return V when 5', () => {
    const decimal = 5;

    const romanNumeral = romanNumerals.convertDecimalToRomanNumeral(decimal);

    expect(romanNumeral).toBe('V');
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
