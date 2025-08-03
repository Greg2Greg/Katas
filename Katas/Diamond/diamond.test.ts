import { describe, it, expect } from 'vitest';
import { Diamond } from './diamond.ts';

describe('Diamond test', () => {
  const diamond = new Diamond();
  it('Should throw if provide more than a letter', () => {
    expect(() => diamond.of('AA')).toThrow('You should provide only one character');
  });
  it('Should throw if provide a number', () => {
    expect(() => diamond.of('1')).toThrow('You should provide only one character');
  });

  /*
   Cette opération demande de développeur plusieurs concepts en même temps: 
   Indentation des espaces, retour à la ligne etc. Instinctivement, le pratiquant
   TDD novice irait cherche le retour en dur, puis le retour conditionnel et chercherait
   à généraliser avec un boucle à la fin. Ce test étant, le premier if, le prochain un 
   second etc jusqu'à tentative de généralisation. Mais en réalité, en faisant de cette
   manière, on code tout d'un coup. Il faut sous-découper le problème d'une autre manière.
   Par exemple: en gérant uniquement la première ligne selon la lettre.

   Attention, le piège ici est de vouloir gérer l'indentation en début de ligne. En effet,
   c'est une tâche que l'orchestrateur de ligne va devoir gérer. Pourquoi ? On remarque que
   l'indentation du début dépend de la lettre choisi. Mais l'indentation entre les lettres,
   elle, ne change pas.

   Donc ici, je mets en "pause" la solution globale, je descends d'un cran pour gérer un
   sous-problème, puis je vais remonter sur la solution globale. J'aime dire qu'il y a 
   une méthode / un objet qui a un but précis, et un orchestrateur. Et c'est fractal, ici
   on est sur 1 niveau, on pourrait descendre à plusieurs niveaux.
  */
  it('Should return lineof A', () => {
    expect(diamond.lineOf('A')).toBe('A');
  });

  it('Should return lineof B', () => {
    expect(diamond.lineOf('B')).toBe('B B');
  });

  it('Should return lineof C', () => {
    expect(diamond.lineOf('C')).toBe('C   C');
  });

  it('Should return lineof D', () => {
    expect(diamond.lineOf('D')).toBe('D     D');
  });

  /*
    A présent, je reprends au niveau de l'orchestrateur. Pour une question
    de lisibilité, je vois qu'il est plus simple de le mettre sous forme d'array
  */
  it('Should return diamond of B', () => {
    expect(diamond.of('B')).toEqual([' A', 'B B', ' A']);
  });
  /*
    Je fais passer le test précédant, j'essaye de faire passer celui-ci. Je vois
    si la résolution est rapide et évidente, sinon je découpe
  */

  /*
   A
  B B
 C   C
D     D
 C   C
  B B
   A
*/
  it('Should return diamond of C', () => {
    //expect(diamond.of('B')).toBe(' A\nB B\n A');
    expect(diamond.of('C')).toEqual(['  A', ' B B', 'C   C', ' B B', '  A']);
  });

  /*
    Je vois un algorithme qui se dessine, je reproduis une 3ème fois pour confirmer
  */
  it('Should return diamond of D', () => {
    expect(diamond.of('D')).toEqual(['   A', '  B B', ' C   C', 'D     D', ' C   C', '  B B', '   A']);
  });
});
