export class FizzBuzz {
  translate(number: Array<number>): Array<string> {
    const fizzBuzzArray = new Array<string>();

    number.forEach((number) => {
      fizzBuzzArray.push(this.translateSingleDecimal(number));
    });

    return fizzBuzzArray;
  }

  private translateSingleDecimal(number: number): string {
    if (number % 3 === 0 && number % 5 === 0) {
      return 'FizzBuzz';
    }

    if (number % 3 === 0) {
      return 'Fizz';
    }

    if (number % 5 === 0) {
      return 'Buzz';
    }

    return number.toString();
  }
}
