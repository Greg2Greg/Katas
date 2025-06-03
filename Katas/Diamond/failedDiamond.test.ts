import { Diamond } from './diamond.ts';

xdescribe('Diamond test', () => {
  // On considère que Diamant de A c'est juste A
  // Je laisse ce test pour conserver le raisonnement
  it('Diamond of A', () => {
    expect(new Diamond().of('A')).toEqual(['A']);
  });

  /*
    Et là on voit qu'on passe d'un retour A à un diamand:
                A
               B B
                A
    A avec espace et retour à la ligne B sans espace,
    puis espace puis B, retour à la ligne, espace A.

    D'un coup, on ajoute énormément de règles supplémentaires.
    A ce moment-là, on doit se poser la question: comment découper
    le problème? 

    Finalement, on voit qu'il y a une problématique de ligne qui peut
    être géré indépendamment. Et ensuite, chaque ligne, va devoir gérer
    son espacement initial pour créer le diamand. Le but est de valider
    cette hypothèse.

    Donc, prochain test, on réduit le problème à "LineOf" plutôt qu'à
    un diamand dans son ensemble. Aussi, à chaque résolution partielle
    de sous-problème, on peut vérifie si ça match bien avec le problème
    dans son ensemble.
  */
  it('Lineof A', () => {
    expect(new Diamond().lineOf('A')).toBe('A');
  });
  it('Lineof B', () => {
    expect(new Diamond().lineOf('B')).toBe('B B');
  });

  /*
    En continue, je vérifie si la résolution de mon sous-problème
    se marrie bien avec le problème dans son ensemble. Souvent,
    on va généraliser après une récurrence (1=occurence, 2=coincidence,
    3=récurrence).

    Et là, je me rends compte que c'est un peu chiant de devoir gérer ça
    avec des \n dans un string. Ca serait plus simple pour moi de gérer ça
    avec un tableau. Par conséquent, je change le retour. Mais au début, 
    je n'essaye pas de résoudre encore le diamand. Je skip le test, je
    l'implémente juste une fois pour voir s'il n'y a pas déjà quelque
    chose qui cloche.
  */
  xit('Diamond of B', () => {
    expect(new Diamond().of('B')).toBe([' A ', 'B B', ' A ']);
  });
  /*
  Côté code, on a une récurrence, on peut tenter une généralisation: 
    if (letter === 'A') {
      return 'A';
    }

    if (letter === 'B') {
      return 'B B';
    }
    if (letter === 'C') {
      return 'C  C';
    }


   */
  it('Lineof C', () => {
    expect(new Diamond().lineOf('C')).toBe('C  C');
  });
});
