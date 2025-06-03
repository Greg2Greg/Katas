const ASCII_DELTA = 65;
const SPACE = ' ';

export class Diamond {
  of(letter: string): Array<string> {
    if (letter.length > 1) {
      throw new Error('You should provide only one character');
    }

    if (!Number.isNaN(Number(letter))) {
      throw new Error('You should provide only one character');
    }

    if (letter === 'A') {
      throw new Error('Cannot be diamonded');
    }

    const result = [this.lineOf(letter)];
    const letterIndexInAlphabet = letter.charCodeAt(0) - ASCII_DELTA;
    for (let i = 0; i < letterIndexInAlphabet; i++) {
      const tmpLetter = String.fromCharCode(letterIndexInAlphabet - i - 1 + ASCII_DELTA);

      result.unshift(this.pad(i + 1) + this.lineOf(tmpLetter));
      result.push(this.pad(i + 1) + this.lineOf(tmpLetter));
    }

    return result;

    /*
     J'ai trouvé l'algorithme de généralisation, il me reste plus qu'à refactorer
     pour enlever les conditions

    const result = [this.lineOf(letter)];
    if (letter === 'B') {
      const letterIndexInAlphabet = letter.charCodeAt(0) - ASCII_DELTA;
      for (let i = 0; i < letterIndexInAlphabet; i++) {
        result.unshift(
          this.pad(i + 1) + this.lineOf(String.fromCharCode(letterIndexInAlphabet - i - 1 + ASCII_DELTA))
        );
        result.push(
          this.pad(i + 1) + this.lineOf(String.fromCharCode(letterIndexInAlphabet - i - 1 + ASCII_DELTA))
        );
      }

      return result;
    }

    if (letter === 'C') {
      const letterIndexInAlphabet = letter.charCodeAt(0) - ASCII_DELTA;
      for (let i = 0; i < letterIndexInAlphabet; i++) {
        result.unshift(
          this.pad(i + 1) + this.lineOf(String.fromCharCode(letterIndexInAlphabet - i - 1 + ASCII_DELTA))
        );
        result.push(
          this.pad(i + 1) + this.lineOf(String.fromCharCode(letterIndexInAlphabet - i - 1 + ASCII_DELTA))
        );
      }

      return result;
    }

    const letterIndexInAlphabet = letter.charCodeAt(0) - ASCII_DELTA;
    for (let i = 0; i < letterIndexInAlphabet; i++) {
      result.unshift(
        this.pad(i + 1) + this.lineOf(String.fromCharCode(letterIndexInAlphabet - i - 1 + ASCII_DELTA))
      );
      result.push(
        this.pad(i + 1) + this.lineOf(String.fromCharCode(letterIndexInAlphabet - i - 1 + ASCII_DELTA))
      );
    }

    return result;
    */

    /*
      Ici on cherche à dessiner une solution qui permettra de passer
      facilement l'étape de généricité de la boucle. Le but étant de 
      faire d'étape en étape afin que le passage à la boucle soit le 
      plus simple possible. 

      Encore une fois, cela demande la créativité de se dire "j'ajoute
      d'abord la lettre au centre, puis j'ajoute les lettres autour
      via .unshift au début et .push à la fin"

      Attention à bien résister à la tentation de vouloir généraliser
      directement lors de l'étape précédente. D'abord on effectue
      le test de boucle dans 1 if, puis on l'étend aux autres. Il y
      a encore du code écrit en dur ici.

    const result = [this.lineOf(letter)];
    if (letter === 'B') {
      // eslint-disable-next-line prettier/prettier
      result.unshift(this.pad(1) + this.lineOf('A'));
      result.push(this.pad(1) + this.lineOf('A'));
      return result;
    }

    if (letter === 'C') {
      // eslint-disable-next-line prettier/prettier
      result.unshift(this.pad(1) + this.lineOf('B'));
      result.push(this.pad(1) + this.lineOf('B'));
      result.unshift(this.pad(2) + this.lineOf('A'));
      result.push(this.pad(2) + this.lineOf('A'));

      return result;
    }
    // eslint-disable-next-line prettier/prettier
    result.unshift(this.pad(1) + this.lineOf('C'));
    result.push(this.pad(1) + this.lineOf('C'));
    result.unshift(this.pad(2) + this.lineOf('B'));
    result.push(this.pad(2) + this.lineOf('B'));
    result.unshift(this.pad(3) + this.lineOf('A'));
    result.push(this.pad(3) + this.lineOf('A'));

    return result;
    */

    /* 
      La seconde étape est de réutiliser ce qui a été développé pour le 
      sous-problème afin de ne plus avoir des valeurs en dur.

    if (letter === 'B') {
      // eslint-disable-next-line prettier/prettier
      return [
        this.pad(1) + this.lineOf('A'),
        this.lineOf(letter), 
        this.pad(1) + this.lineOf('A'),
      ];
    }

    if (letter === 'C') {
      // eslint-disable-next-line prettier/prettier
      return [
        this.pad(2) + this.lineOf('A'),
        this.pad(1) + this.lineOf('B'),
        this.lineOf(letter),
        this.pad(1) + this.lineOf('B'),
        this.pad(2) + this.lineOf('A'),
      ];
    }
    // eslint-disable-next-line prettier/prettier
    return [
      this.pad(3) + this.lineOf('A'),
      this.pad(2) + this.lineOf('B'),
      this.pad(1) + this.lineOf('C'),
      this.lineOf(letter),
      this.pad(1) + this.lineOf('C'),
      this.pad(2) + this.lineOf('B'),
      this.pad(3) + this.lineOf('A'),
    ];
    */

    /* 
      Comme d'habitude, on fait le minimum pour faire passer le test.
      C'est à dire, d'écrire en dur. Puis on passe à une refacto pour 
      extraire le code en dur.

    if (letter === 'B') {
      // eslint-disable-next-line prettier/prettier
      return [
        ' A', 
        'B B', 
        ' A'
      ];
    }

    if (letter === 'C') {
      // eslint-disable-next-line prettier/prettier
      return [
        '  A', 
        ' B B', 
        'C   C',
        ' B B',
        '  A'];
    }
    // eslint-disable-next-line prettier/prettier
    return [
      '   A',
      '  B B',
      ' C   C',
      'D     D',
      ' C   C',
      '  B B',
      '   A'];
     */
  }

  /*
   Cette méthode est censé être private à la toute fin. Elle ne devrait
   pas être testé, c'est un détail d'implémentation pour arriver à bout
   du problème.

   Elle reste public ici pour les besoins pédagogiques.
  */
  lineOf(letter: string): string {
    // Cas spécial
    if (letter === 'A') {
      return 'A';
    }

    const letterIndexInAlphabet = letter.charCodeAt(0) - ASCII_DELTA;
    const paddingBetween = letterIndexInAlphabet + letterIndexInAlphabet - 1;
    return letter + this.pad(paddingBetween) + letter;

    /*
    // 1 => Charcode = 1
    if (letter === 'B') {
      return 'B B';
    }

    // 3 => Charcode = 2 => 2 + 1
    if (letter === 'C') {
      return 'C   C';
    }

    // 5 => Charcode = 3 => 3 + 2
    if (letter === 'D') {
      return 'D     D';
    }

    // 7, 9, 11, ... => Charcode = X + X - 1
    */
  }

  private pad(padding: number) {
    return SPACE.repeat(padding);
  }
}
