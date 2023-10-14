export interface RoomAvailabilityReadLayer {
  getAvailability(
    arrivalDate: Date,
    departureDate: Date,
  ): Promise<Record<string, [[Date, Date]]>>;
}
