export type AvailabilityMap = Record<string, [Date, Date][]>;

export interface RoomAvailabilityReadLayer {
  getAvailability(
    arrivalDate: Date,
    departureDate: Date,
  ): Promise<AvailabilityMap>;
}
