import fc from 'fast-check';
import { describe, it } from 'vitest';
import { Reservation, ReservationScheduler } from './PropertyBasedTesting.ts';

const oneMinuteInMs = 60_000;
const baseDate = Date.UTC(2025, 0, 1, 0, 0, 0);

/*
  Création d'un espace de génération de valeurs (pour éviter de générer des coupes de valeurs absurdes et de générer des réservations non-valides) : 
    1. On demande à fast-check de générer un objet que l'on défini avec des valeurs bornées. 
    2. Cet objet est mappé pour créer un objet de réservation valide.

  Le but est de tester une propriété métier, et pas juste de tester des cas particuliers. C'est pour cela que l'on génère des objets de réservation valides de manière dynamique. Cela permet automatiquement de tester des cas exploratoires qui n'ont pas été envisagés par le développeur.
*/
const dynamicValidReservation = fc
  .record({
    startOffsetInMinutes: fc.integer({ min: 0, max: 7 * 24 * 60 }),
    durationInMinutes: fc.integer({ min: 1, max: 12 * 60 }),
  })
  .map(
    ({ startOffsetInMinutes, durationInMinutes }): Reservation =>
      new Reservation(
        new Date(baseDate + startOffsetInMinutes * oneMinuteInMs),
        new Date(baseDate + (startOffsetInMinutes + durationInMinutes) * oneMinuteInMs),
        'room-1'
      )
  );

describe('ReservationScheduler', () => {
  it('never accepts overlapping reservations for the same resource', () => {
    /*
      1. Exécute 500 fois le test avec des valeurs générées aléatoirement par fast-check.
      2. ReservationScheduler est borné avec maximum 25 réservations existantes pour éviter de générer des cas absurdes.
      3. tryBooks book les réservations existantes en une transaction.

      fc.assert : exécute cette propriété plusieurs fois avec des valeurs générées automatiquement. Si la propriété retourne false une seule fois, le test échoue.

      fc.property : décrit une propriété à vérifier.

      fc.array : 
        - génère un tableau de réservations de longueur minimum 1 et maximum 25
        - génère un objet de réservation valide
        - retourne true = la propriété est vérifiée, false = la propriété est violée
    */
    fc.assert(
      fc.property(
        fc.array(dynamicValidReservation, { minLength: 1, maxLength: 25 }),
        dynamicValidReservation,
        (existingReservations, newReservation) => {
          // Given: Créer le scheduler et booker les réservations existantes
          const scheduler = new ReservationScheduler();
          scheduler.tryBooks(existingReservations);
          const reservationsBeforeNewBooking = scheduler.getReservations();

          // When: Book le nouveau créneau
          const bookingAccepted = scheduler.tryBook(newReservation);

          // Then: Si le nouveau créneau chevauche un créneau existant, le booking doit être refusé
          // Attention au test miroir : l'oracle ne doit pas dépendre de l'implémentation du code testé.
          return bookingAccepted === shouldAccept(reservationsBeforeNewBooking, newReservation);
        }
      ),
      { numRuns: 500 }
    );
  });
});

const shouldAccept = (existingReservations: readonly Reservation[], newReservation: Reservation): boolean =>
  existingReservations.every(
    (existingReservation) =>
      newReservation.end <= existingReservation.start || newReservation.start >= existingReservation.end
  );
