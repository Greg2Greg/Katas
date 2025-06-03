import { FrameFactory } from './frameFractory.ts';
import { IBonusFrame, IBowlingGame, IFrameEvents, IFrameObservable, IFrameObserver } from './models.ts';

/*
  Avec cette version OO, contrairemment à la V1 procédurale,
  la première chose qui me vient à l'esprit c'est l'évolutivité.

  Ajouter de nouveaux types de frames, ajouter plus de frame au sein
  d'un jeu, modifier l'orchestration (et donc les règles métiers) est 
  beaucoup plus simple ici.

  Les raisons sont les suivantes, au niveau des frames:
    1. La logique des frames est encapsulée et basée sur une interface.
       Son API publique est orienté comportement sans divulguer les détails 
       d'implémentations. On ne peut pas mettre l'objet dans un état incohérent. 

   2. Les frames sont actives: l’inversion de contrôle n'est pas uniquement 
      choisir son implémentation, c’est aussi faire en sorte qu’une classe soit 
      active (informe la partie qui l’orchestre) et non pas que la partie 
      qui orchestre interroge (version passive). BowlingGame ne décide pas 
      du "quand", c'est la frame qui appelle le BowlingGame. La communication
      est contrôlée via des hooks. C'est ce qui permet de gérer la complétion
      et les bonus.
    
    3. Lisibilité et compréhension. Les problèmes sont décomposés en 
       sous-problèmes qui sont solutionnés en petit algorithme chacun, 
       à la place d'un gros algorithme indigeste. Avec chaque concept
       décortiqué, nommé et qui possède une responsabilité. Aussi,
       l'utilisation du pattern state facilite la compréhension.

  Au niveau des frames a donc SRP + encapsulation + communication contrôlée via 
  inversion de dépendance grâce aux hooks.*1*

  Au niveau du BowlingGame (orchestration des frames) : 
    1. Lisibilité et compréhension. Les problèmes sont décomposés en 
       sous-problèmes qui sont solutionnés en petit algorithme chacun, 
       à la place d'un gros algorithme indigeste. Avec chaque concept
       décortiqué, nommé et qui possède une responsabilité. 
    
    2. La conséquence de 1. c'est la l'extraction de l'algorithme de création 
       qui  constitue l'essence de l'orchestration du jeu. Et ce, sans toucher 
       aux implémentations des frames. Pareil avec les bonus => c'est le respect
       de l'OCP: "ouvert" aux extensions mais fermé aux modifications => 
       Pour de nouvelles fonctionnalités, on ajoute du code sans avoir à modifier 
       l'existant.
    
    Améliorations possibles: 
    1. Overkill ici car les règles de gestion du Bowling n'ont pas vocation à changer. 
       Mais, si c'était le cas,  on pourrait mettre en place un pattern strategy pour 
       modifier à la volée le fonctionnement des créations. Par conséquent, la dynamique 
       même du jeu en serait modifier. L'ajout de nouveaux types de frames est également 
       facilement réalisable. 
    
    2. On pourrait faire du Bowling game un "moteur générique" ou "game engine" 
       en opposition au "game rules".*2*
       
    L'essentiel dans tout ça c'est de découper le problème en sous-problèmes et
    que chaque sous-problème possède sa propre responsabilité. Ici, on voit bien
    que Frame gère ses propres règles métiers. Que Bowling vient orchestrer tout
    cela. Qu'au sein de Bowling, on a la FrameFactory qui s'occupe de gérer comment
    les frames sont créés mais aussi leurs cycles de vie. Que Bowling implèmente
    IFrameObserver qui l'oblige à déclarer une fonction pour gérer les différents
    évènements.

==== *1* ====
    Cette inversion qui rend l'objet actif est également appelée "hook". C'est 
    une manière évènementielle qui permet à un objet observateur d’être notifié 
    d’un événement important dans un autre objet, souvent sans couplage fort.
    Un hook est une fonction spéciale que l'on "branche":

     - Une callback que l'on passe pour être appelée à un moment précis (via 
       constructeur ou argument d'une fonction publique que l'on conserve ensuite
       en props privée) => Attention à bien mettre en place les mécanismes qui 
       permettent d'éviter que la callback soit undefined (interface + throw). 
       Prendre en compte que, techniquement, l'orchestrateur déporte de la 
       logique dans la frame, car le code sera exécuté au niveau de la frame.
  
     - La mise en place d'un patterne d'observation => pas de couplage

==== *2* ====
export interface GameRules {
  shouldCreateNewFrame(index: number): boolean;
  isLastFrame(index: number): boolean;
  isGameOver(index: number): boolean;
}

export class DefaultGameRules implements GameRules {
  shouldCreateNewFrame(index: number) {
    return index < 9;
  }
  isLastFrame(index: number) {
    return index === 9;
  }
  isGameOver(index: number) {
    return index >= 10;
  }
}
*/
export class BowlingGameV2 implements IBowlingGame, IFrameObserver {
  private bonusFrames = new Array<IBonusFrame>();
  private frame: IFrameObservable;
  private frames = new Array<IFrameObservable>();
  private state: 'NOT_FINISHED' | 'COMPLETED' = 'NOT_FINISHED';
  private frameFactory = new FrameFactory();

  constructor() {
    this.frame = this.frameFactory.createFrame({ frameIndex: 0, observer: this });
    this.frames.push(this.frame);
  }

  roll(pinsDown: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10) {
    if (this.state === 'COMPLETED') {
      throw new Error('Game is completed');
    }

    /* 
      Dépendance temporelle, mais nécessaire. Un orchestrateur doit réaliser
      un enchaînement d'évènement. Ce qui implique un code procédurale exécuté
      dans un ordre précis.
    */
    this.bonusFrames.forEach((observer) => observer.addBonus(pinsDown));
    this.frame.addRoll(pinsDown);
  }

  onFrameNotification(event: IFrameEvents): void {
    const { type, frame } = event;

    switch (type) {
      case 'BONUS_NEEDED': {
        this.handleBonus(frame);
        break;
      }
      case 'BONUS_COMPLETED': {
        this.handleBonusCompleted(frame);
        break;
      }
      case 'COMPLETED': {
        this.handleCompleted();
      }
    }
  }

  getCurrentScore() {
    return this.frames
      .filter((frame) => frame.toDto().score !== 'NOT_STARTED')
      .map((frame) => {
        return frame.toDto();
      });
  }

  private handleBonus(frame: IBonusFrame) {
    this.bonusFrames.push(frame);
  }

  private handleBonusCompleted(frame: IBonusFrame) {
    const observerIndex = this.bonusFrames.indexOf(frame);
    this.bonusFrames.splice(observerIndex, 1);
  }

  private handleCompleted() {
    if (this.frames.length === FrameFactory.MAX_FRAMES) {
      this.state = 'COMPLETED';
      return;
    }

    this.frame = this.frameFactory.createFrame({ frameIndex: this.frames.length, observer: this });
    this.frames.push(this.frame);
  }
}
