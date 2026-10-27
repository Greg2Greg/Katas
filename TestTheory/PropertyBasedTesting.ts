export class Reservation {
  public constructor(
    public readonly start: Date,
    public readonly end: Date,
    public readonly resourceId: string
  ) {}

  public isValid(): boolean {
    return this.start < this.end;
  }

  public overlaps(other: Reservation): boolean {
    return this.resourceId === other.resourceId && this.start < other.end && other.start < this.end;
  }
}

export class ReservationScheduler {
  private readonly reservations: Reservation[] = [];

  public tryBook(newReservation: Reservation): boolean {
    return this.tryBooks([newReservation]);
  }

  public tryBooks(newReservations: readonly Reservation[]): boolean {
    if (!this.canBookAll(newReservations)) {
      return false;
    }

    this.reservations.push(...newReservations);

    return true;
  }

  public getReservations(): Reservation[] {
    return [...this.reservations];
  }

  private canBookAll(newReservations: readonly Reservation[]): boolean {
    return (
      newReservations.every((reservation) => reservation.isValid()) &&
      newReservations.every((reservation) => !this.hasConflictWithExistingReservation(reservation)) &&
      !this.hasConflictBetweenNewReservations(newReservations)
    );
  }

  private hasConflictWithExistingReservation(newReservation: Reservation): boolean {
    return this.reservations.some((reservation) => reservation.overlaps(newReservation));
  }

  private hasConflictBetweenNewReservations(newReservations: readonly Reservation[]): boolean {
    return newReservations.some((reservation, index) =>
      newReservations.slice(index + 1).some((otherReservation) => reservation.overlaps(otherReservation))
    );
  }
}
