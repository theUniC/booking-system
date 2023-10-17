export type AvailabilityMap = Record<string, [Date, Date][]>;

export interface RoomAvailabilityReadLayer {
  getAvailability(): Promise<AvailabilityMap>;
  addBooking(
    roomName: string,
    arrivalDate: Date,
    departureDate: Date,
  ): Promise<void>;
}

export const ROOM_AVAILABILITY_READ_LAYER = Symbol(
  'RoomAvaialabilityReadLayer',
);
