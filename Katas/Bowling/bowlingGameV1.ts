export class BowlingGameV1 {
  private rolls = new Array<number>();

  /*
    Pour passer tous les tests il faut ajouter un système de 
    validation comptant le nombre de frames. Le nombre de frame 
    est également calculé dans getCurrentScore => répétitions. 
    On pourrait compter le score directement dans addRoll puis
    au fur et à mesure dériver sur la version V2 en créant un
    concept de frame etc mais ce n'est pas le but ici.

    Déjà ici, sur un algorithme relativement simple, on voit
    les limites d'un code procédural dans la lisibilité: 
    boucle for avec beaucoup de if imbriqué. 

    Certes il y a moins de code, mais ça n'est pas évolutif.
    Ici, un nouveau type de frame avec un comportement particulier 
    pourrait être beaucoup plus complexe à gérer. getCurrentScore() 
    agirait comme un big ball of mud qui gère tout, or, ce n'est pas 
    ce qui est souhaité.

    Dans tous les cas, c'est une solution vers laquelle on aurait pu
    arriver en utilisant le TDD. Le TDD permet de résoudre un algorithme,
    pour autant, il faut le BDD et sa compréhension du métier pour à un 
    moment donné faire sortir un design propre en orienté objet. Le concept
    de "frame" on ne l'invente pas, il existait déjà. Mais cela est spécifique
    au Bowling, sur des problématiques techniques il faut parfois que nous
    identifions nous-mêmes nos propres concepts afin de les extraire dans une 
    classe. Pour cela, il faut identifier un groupe de données cohésifs et 
    créer des méthodes qui agiront comme des cas d'utilisation.
    => ATTENTION: normalement on va d'abord créer l'API de la classe à travers
    les cas d'utilisation, puis à l'aide des tests, obtenir l'implémentation
    concrète. 
  */
  roll(pinsDown: number) {
    this.rolls.push(pinsDown);
  }

  getCurrentScore(): any {
    const score = new Array<{
      firstRoll: number;
      secondRoll?: number;
      thirdRoll?: number;
      score: number | 'WAITING_ON_NEXT_ROLLS';
    }>();

    if (this.rolls.length === 0) {
      return [];
    }

    let totalFrame = 1;
    for (let i = 0; i < this.rolls.length; i++) {
      const currentRoll = this.rolls[i];
      const nextRoll = this.rolls[i + 1];
      const secondNextRoll = this.rolls[i + 2];

      if (this.isLastFrame(totalFrame)) {
        if (this.isSpare({ firstRoll: currentRoll, secondRoll: nextRoll }) || this.isStrike(currentRoll)) {
          score.push({
            firstRoll: currentRoll,
            secondRoll: nextRoll,
            thirdRoll: secondNextRoll,
            score:
              nextRoll && secondNextRoll ? currentRoll + nextRoll + secondNextRoll : 'WAITING_ON_NEXT_ROLLS',
          });
        }
        totalFrame++;
        break;
      } else {
        if (this.isStrike(currentRoll)) {
          score.push({
            firstRoll: currentRoll,
            score:
              nextRoll && secondNextRoll ? currentRoll + nextRoll + secondNextRoll : 'WAITING_ON_NEXT_ROLLS',
          });
          totalFrame++;
        } else {
          if (nextRoll !== undefined) {
            if (this.isSpare({ firstRoll: currentRoll, secondRoll: nextRoll })) {
              score.push({
                firstRoll: currentRoll,
                secondRoll: nextRoll,
                score: secondNextRoll ? currentRoll + nextRoll + secondNextRoll : 'WAITING_ON_NEXT_ROLLS',
              });
            } else {
              score.push({
                firstRoll: currentRoll,
                secondRoll: nextRoll,
                score: currentRoll + nextRoll,
              });
            }

            totalFrame++;
            i++;
          } else {
            score.push({
              firstRoll: currentRoll,
              score: 'WAITING_ON_NEXT_ROLLS',
            });
          }
        }
      }
    }

    return score;
  }
  isLastFrame(totalFrame: number) {
    return totalFrame === 10;
  }

  isStrike(roll: number) {
    if (roll === 10) {
      return true;
    }

    return false;
  }

  private isSpare(rolls: { firstRoll: number; secondRoll: number }) {
    const { firstRoll, secondRoll } = rolls;

    if (firstRoll + secondRoll === 10) {
      return true;
    }

    return false;
  }
}
