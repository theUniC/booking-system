export class BookRoomCommand {
  constructor(
    readonly clientId: string,
    readonly roomName: string,
    readonly arrivalDate: Date,
    readonly departureDate: Date,
  ) {}
}
