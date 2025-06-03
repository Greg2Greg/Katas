import { Game } from './core/game.ts';
import { ConsoleInputer } from './infra/inputer/consoleInputer.ts';
import { ConsoleOutputer } from './infra/outputer/consoleOutputer.ts';
import { RealRandomNumberGenerator } from './infra/randomNumberGenerator/realRandomNumberGenerator.ts';

/*
  Pour lancer, rendez vous dans le bon dossier, puis: pnpx tsx main.ts.
  
  L'architecture a une forme MVC. Le game est le controller, Outputer = vue.
  
  L'avantage avec TDD c'est qu'on a pu tester et valider le comportement sans 
  lancer le programme une fois.

  L'injection de dépendance ici nous permet de remplacer l'outputer par tout et n'importe quoi.
  L'outputer pourrait être remplacé par un navigateur, via un réseau sur serveur.
*/
function main() {
  const game = new Game(new ConsoleInputer(), new ConsoleOutputer(), new RealRandomNumberGenerator());
  return game.start();
}

main();
