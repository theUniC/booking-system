export class GetFreeRoomsQuery {
  constructor(
    readonly arrivalDate: Date,
    readonly departureDate: Date,
  ) {}
}
