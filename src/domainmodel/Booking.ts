export class Booking {
  constructor(
    private clientId: string,
    private roomName: string,
    private arrivalDate: Date,
    private departureDate: Date,
  ) {}

  public getRoomName(): string {
    return this.roomName;
  }

  public getArrivalDate(): Date {
    return this.arrivalDate;
  }

  public getDepartureDate(): Date {
    return this.departureDate;
  }
}
