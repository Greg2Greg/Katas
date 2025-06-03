const regex = /^[A-Z]$/g;
const ASCII_DELTA = 65;
export class FailedDiamond {
  of(letter: string) {
    if (!letter.match(regex)) {
      throw new Error('You should provide only one character');
    }

    /*
     Permet de récupérer le numéro du charactère dans la table ASCII.
     Commence à 65 = A et fini à 90 = Z. C'est un tips qui permet de
     calculer les écarts. Autrement, il aurait fallu associer chaque
     lettre avec un nombre et pour le coup c'était pas très élégant.
     Je retire 65 pour qu'on aille de 0 à 25.
    */
    const charCode = letter.charCodeAt(0) - ASCII_DELTA;

    /*
     Je pensais faire bien ici: j'ai mes différents if et je comptais généraliser.
     Mais finalement, je suis en train de généraliser trop d'un coup. Une fois devant 
     la boucle, le code ne sort pas "d'un coup". Il n'y a pas de "baby step" pour 
     passer ce code. C'est tout de suite d'un if à plusieurs boucles imbriquées. 
     D'un coup, on doit gérer le \n, l'espace avant, l'espace entre, les caractères.
     J'ai tenté 10min avec une boucle qui en imbriquait d'autres.

     Puis, j'ai vu que je pouvais découper en sous-problèmes: d'abord gérer la partie
     ascendante du diamant, puis la partie descendante avec chacun une boucle. Pareil,
     j'ai cherché pendant 15min, je vois que je me m'approche de la solution, mais 
     encore une fois pas en TDD. Là je suis en train de le résoudre de manière classique,
     avec des debugs, des logs. Avec un test qui passe pas pendant 20min. Un baby step
     c'est 3min max. Là ça n'avance pas. Dans ce genre de cas, ça veut souvent dire qu'on
     a pas la bonne approche de résolution. On a pas bien découper le gros problème en 
     sous-problème. Le but n'est pas de finir l'algorithme, mais de le finir via TDD, donc
     je ne vais pas m'acharner sur cette solution. 

     Il faut repartir de 0, analyser le problème dans son ensemble et identifier des 
     sous-ensembles que l'on peut résoudre indépendamment et réutiliser par la suite.
     Cela passe par comprendre profondément ce qui est demandé, tester des solutions,
     faire marche arrière si on voit que ça ne passe pas et se tenter à nouveau
     autre chose. Ca demande de la créativité.

     Ce qui est bien avec TDD, c'est qu'on arrive facilement à "sentir" lorsqu'on est
     sur le mauvais chemin, car plus de baby step, on voit qu'on essaye de résoudre un
     trop gros morceau etc. 

     On va également voir, sur la bonne pratique TDD de ce kata, que les tests étaient
     écrit trop rapidement sans gérer les baby steps. Tout est commenté.
    */

    const space = ' ';

    // Ascending
    let computedDiamond = '';
    for (let i = 0; i < charCode + 1; i++) {
      const initialSpace = space.repeat(i);

      const letter = String.fromCharCode(i + ASCII_DELTA);

      if (letter === 'A') {
        if (i === charCode) {
          computedDiamond += initialSpace + letter;
        } else {
          computedDiamond += initialSpace + letter + '\n';
        }
      }

      const inBetweenSpace = space.repeat(i);
      computedDiamond += inBetweenSpace + letter + '\n';
    }

    // Descending
    for (let i = charCode; i > -1; i--) {
      const initialSpace = space.repeat(i);
      const letter = String.fromCharCode(i + ASCII_DELTA);

      if (i === charCode) {
        computedDiamond += initialSpace + letter;
      } else {
        computedDiamond += initialSpace + letter + '\n';
      }
    }

    return computedDiamond;

    /*
    if (letter == 'B') {
      return ` A\nB B\n A`;
    }

    if (letter == 'C') {
      return `  A\n B B\nC   C\n B B\n  A`;
    }

    if (letter == 'D') {
      return `   A\n  B B\n C   C\nD     D\n C   C\n  B B\n   A`;
    }

    return '';*/
  }
}
