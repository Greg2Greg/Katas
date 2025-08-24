import { assert } from 'ts-essentials/dist/functions/assert/index.js';

type Direction = 'SUD' | 'NORD' | 'EST' | 'OUEST';
type Localisation = `${string} ${string} ${Direction}`;
type Instruction = 'AVANCER' | 'ROTATION_DROITE' | 'ROTATION_GAUCHE';

export class Tondeuse {
  private readonly _nom: string;
  private position: number[];
  private direction: Direction;

  constructor(args: { nom: string; position: number[]; direction: Direction }) {
    this._nom = args.nom;
    this.position = args.position;
    this.direction = args.direction;
  }

  deplacer(instruction: Instruction) {
    switch (instruction) {
      case 'AVANCER': {
        this.avancer();
        break;
      }
      case 'ROTATION_DROITE': {
        this.rotationDroite();
        break;
      }

      case 'ROTATION_GAUCHE': {
        this.rotationGauche();
        break;
      }
    }
  }

  private rotationDroite() {
    switch (this.direction) {
      case 'SUD': {
        this.direction = 'EST';
        return;
      }
      case 'EST': {
        this.direction = 'NORD';
        return;
      }
      case 'NORD': {
        this.direction = 'OUEST';
        return;
      }
      case 'OUEST': {
        this.direction = 'SUD';
        return;
      }
    }
  }

  private rotationGauche() {
    switch (this.direction) {
      case 'SUD': {
        this.direction = 'OUEST';
        return;
      }
      case 'OUEST': {
        this.direction = 'NORD';
        return;
      }
      case 'NORD': {
        this.direction = 'EST';
        return;
      }
      case 'EST': {
        this.direction = 'SUD';
        return;
      }
    }
  }

  private avancer() {
    assert(this.position[0] !== undefined, 'La position en y ne devrait pas être undefined');
    assert(this.position[1] !== undefined, 'La position en x ne devrait pas être undefined');

    switch (this.direction) {
      case 'SUD':
        this.position[0]++;
        return;
      case 'NORD':
        this.position[0]--;
        return;
      case 'EST':
        this.position[1]++;
        return;
      case 'OUEST':
        this.position[1]--;
        return;
    }
  }

  get localisation(): Localisation {
    return `${this.position[0]} ${this.position[1]} ${this.direction}`;
  }

  get nom(): string {
    return this._nom;
  }
}

export class Simulation {
  private tondeuses = new Array<Tondeuse>();

  ajouterTondeuse(tondeuse: Tondeuse) {
    this.tondeuses.push(tondeuse);
  }

  deplacerTondeuse(nomTondeuse: string, instruction: Instruction) {
    const tondeuse = this.recupererTondeuse(nomTondeuse);
    tondeuse.deplacer(instruction);
  }

  obtenirLocalisationTondeuse(nomTondeuse: string): Localisation {
    const tondeuse = this.recupererTondeuse(nomTondeuse);
    return tondeuse.localisation;
  }

  private recupererTondeuse(nomTondeuse: string): Tondeuse {
    const tondeuses = this.tondeuses.filter((t) => t.nom === nomTondeuse);

    if (tondeuses === undefined) {
      throw new Error("La tondeuse n'existe pas");
    }

    assert(tondeuses[0], 'La tondeuse devrait exister');
    return tondeuses[0];
  }
}
