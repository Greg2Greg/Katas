import { DocumentBuilder } from './document.builder.ts';

/*
  Possible to add arguments to have dynamic data handling
*/
export class MotivationDirector {
  construct(builder: DocumentBuilder): void {
    builder.reset();
    builder.addHeading(1, 'Lettre de motivation');
    builder.addHeading(2, 'Candidature');
    builder.addParagraph('Je souhaite rejoindre votre entreprise pour contribuer a vos projets.');
    builder.addParagraph('Mon experience correspond aux responsabilites du poste.');
  }
}

export class LegalDocumentDirector {
  construct(builder: DocumentBuilder): void {
    builder.reset();
    builder.addHeading(1, 'Contrat de prestation');
    builder.addHeading(2, 'Article 1 - Objet');
    builder.addParagraph('Le present contrat definit les obligations des parties.');
    builder.addHeading(2, 'Article 2 - Conditions');
    builder.addParagraph('Chaque partie s engage a respecter les conditions etablies.');
  }
}
