import { describe, expect, it } from 'vitest';
import { Simulation, Tondeuse } from './lawnmowers.ts';

/*
- Simulation d'une surface rectangulaire 5x5. En bas à gauche = 0,0 et en haut à droite = 5,5.
- Au début, une position est donnée à la tondeuse avec une direction: 0 0 E par exemple. E = East, W = West, S = South, N = North
- Ensuite, on entre une série d'instructions qui va changer la position / direction à savoir : 
    - ROTATION_DROITE : rotation 90° à droite
    - ROTATION_GAUCHE : rotation 90° à gauche
    - AVANCER : avancer tout droit
- Si 2 tondeuses entrent dans une même case, alors il y a collision, le programme s'arrête
- A la toute fin, le résultat est censé donner les positions actualisées des tondeuses

Le Kata va plus loin avec le chargement de tondeuse + instruction via un fichier externe. Toutefois,
je m'arrête ici car cette logique de chargement est maintenant bien connu.
*/

describe('Tondeuses à gazon', () => {
  it(`Ajouter une tondeuse avec une position à la simulation`, () => {
    const simulation = new Simulation();
    const tondeuse = new Tondeuse({ nom: 'Greg', direction: 'SUD', position: [0, 0] });

    simulation.ajouterTondeuse(tondeuse);

    const localisation = simulation.obtenirLocalisationTondeuse('Greg');
    expect(localisation).toBe(`0 0 SUD`);
  });
  it(`Ajouter une tondeuse avec un déplacement tout droit au SUD`, () => {
    const simulation = new Simulation();
    const tondeuse = new Tondeuse({ nom: 'Greg', direction: 'SUD', position: [0, 0] });
    simulation.ajouterTondeuse(tondeuse);

    simulation.deplacerTondeuse('Greg', 'AVANCER');

    const localisation = simulation.obtenirLocalisationTondeuse('Greg');
    expect(localisation).toBe(`1 0 SUD`);
  });
  it(`Ajouter une tondeuse avec un déplacement tout droit au NORD`, () => {
    const simulation = new Simulation();
    const tondeuse = new Tondeuse({ nom: 'Greg', direction: 'NORD', position: [1, 0] });
    simulation.ajouterTondeuse(tondeuse);

    simulation.deplacerTondeuse('Greg', 'AVANCER');

    const localisation = simulation.obtenirLocalisationTondeuse('Greg');
    expect(localisation).toBe(`0 0 NORD`);
  });
  it(`Ajouter une tondeuse avec un déplacement tout droit au EST`, () => {
    const simulation = new Simulation();
    const tondeuse = new Tondeuse({ nom: 'Greg', direction: 'EST', position: [0, 0] });
    simulation.ajouterTondeuse(tondeuse);

    simulation.deplacerTondeuse('Greg', 'AVANCER');

    const localisation = simulation.obtenirLocalisationTondeuse('Greg');
    expect(localisation).toBe(`0 1 EST`);
  });
  it(`Ajouter une tondeuse avec un déplacement tout droit au OUEST`, () => {
    const simulation = new Simulation();
    const tondeuse = new Tondeuse({ nom: 'Greg', direction: 'OUEST', position: [0, 1] });
    simulation.ajouterTondeuse(tondeuse);

    simulation.deplacerTondeuse('Greg', 'AVANCER');

    const localisation = simulation.obtenirLocalisationTondeuse('Greg');
    expect(localisation).toBe(`0 0 OUEST`);
  });
  it(`Ajouter une tondeuse avec une rotation droite à partir du SUD`, () => {
    const simulation = new Simulation();
    const tondeuse = new Tondeuse({ nom: 'Greg', direction: 'SUD', position: [0, 0] });
    simulation.ajouterTondeuse(tondeuse);

    simulation.deplacerTondeuse('Greg', 'ROTATION_DROITE');

    const localisation = simulation.obtenirLocalisationTondeuse('Greg');
    expect(localisation).toBe(`0 0 EST`);
  });
  it(`Ajouter une tondeuse avec une rotation droite à partir du EST`, () => {
    const simulation = new Simulation();
    const tondeuse = new Tondeuse({ nom: 'Greg', direction: 'EST', position: [0, 0] });
    simulation.ajouterTondeuse(tondeuse);

    simulation.deplacerTondeuse('Greg', 'ROTATION_DROITE');

    const localisation = simulation.obtenirLocalisationTondeuse('Greg');
    expect(localisation).toBe(`0 0 NORD`);
  });
  it(`Ajouter une tondeuse avec une rotation droite à partir du NORD`, () => {
    const simulation = new Simulation();
    const tondeuse = new Tondeuse({ nom: 'Greg', direction: 'NORD', position: [0, 0] });
    simulation.ajouterTondeuse(tondeuse);

    simulation.deplacerTondeuse('Greg', 'ROTATION_DROITE');

    const localisation = simulation.obtenirLocalisationTondeuse('Greg');
    expect(localisation).toBe(`0 0 OUEST`);
  });
  it(`Ajouter une tondeuse avec une rotation droite à partir du OUEST`, () => {
    const simulation = new Simulation();
    const tondeuse = new Tondeuse({ nom: 'Greg', direction: 'OUEST', position: [0, 0] });
    simulation.ajouterTondeuse(tondeuse);

    simulation.deplacerTondeuse('Greg', 'ROTATION_DROITE');

    const localisation = simulation.obtenirLocalisationTondeuse('Greg');
    expect(localisation).toBe(`0 0 SUD`);
  });
  it(`Ajouter une tondeuse avec une rotation gauche à partir du SUD`, () => {
    const simulation = new Simulation();
    const tondeuse = new Tondeuse({ nom: 'Greg', direction: 'SUD', position: [0, 0] });
    simulation.ajouterTondeuse(tondeuse);

    simulation.deplacerTondeuse('Greg', 'ROTATION_GAUCHE');

    const localisation = simulation.obtenirLocalisationTondeuse('Greg');
    expect(localisation).toBe(`0 0 OUEST`);
  });
  it(`Ajouter une tondeuse avec une rotation gauche à partir du OUEST`, () => {
    const simulation = new Simulation();
    const tondeuse = new Tondeuse({ nom: 'Greg', direction: 'OUEST', position: [0, 0] });
    simulation.ajouterTondeuse(tondeuse);

    simulation.deplacerTondeuse('Greg', 'ROTATION_GAUCHE');

    const localisation = simulation.obtenirLocalisationTondeuse('Greg');
    expect(localisation).toBe(`0 0 NORD`);
  });
  it(`Ajouter une tondeuse avec une rotation gauche à partir du NORD`, () => {
    const simulation = new Simulation();
    const tondeuse = new Tondeuse({ nom: 'Greg', direction: 'NORD', position: [0, 0] });
    simulation.ajouterTondeuse(tondeuse);

    simulation.deplacerTondeuse('Greg', 'ROTATION_GAUCHE');

    const localisation = simulation.obtenirLocalisationTondeuse('Greg');
    expect(localisation).toBe(`0 0 EST`);
  });
  it(`Ajouter une tondeuse avec une rotation gauche à partir du EST`, () => {
    const simulation = new Simulation();
    const tondeuse = new Tondeuse({ nom: 'Greg', direction: 'EST', position: [0, 0] });
    simulation.ajouterTondeuse(tondeuse);

    simulation.deplacerTondeuse('Greg', 'ROTATION_GAUCHE');

    const localisation = simulation.obtenirLocalisationTondeuse('Greg');
    expect(localisation).toBe(`0 0 SUD`);
  });
  it(`Se rendre au coin supérieur droit`, () => {
    const simulation = new Simulation();
    const tondeuse = new Tondeuse({ nom: 'Greg', direction: 'EST', position: [0, 0] });
    simulation.ajouterTondeuse(tondeuse);

    simulation.deplacerTondeuse('Greg', 'AVANCER');
    simulation.deplacerTondeuse('Greg', 'AVANCER');
    simulation.deplacerTondeuse('Greg', 'AVANCER');
    simulation.deplacerTondeuse('Greg', 'AVANCER');
    simulation.deplacerTondeuse('Greg', 'AVANCER');
    simulation.deplacerTondeuse('Greg', 'ROTATION_GAUCHE');
    simulation.deplacerTondeuse('Greg', 'AVANCER');
    simulation.deplacerTondeuse('Greg', 'AVANCER');
    simulation.deplacerTondeuse('Greg', 'AVANCER');
    simulation.deplacerTondeuse('Greg', 'AVANCER');
    simulation.deplacerTondeuse('Greg', 'AVANCER');

    const localisation = simulation.obtenirLocalisationTondeuse('Greg');
    expect(localisation).toBe(`5 5 SUD`);
  });
});
