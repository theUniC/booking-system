export type AvailabilityMap = Record<string, [Date, Date][]>;

export interface RoomAvailabilityReadLayer {
  getAvailability(): Promise<AvailabilityMap>;
}

export const ROOM_AVAILABILITY_READ_LAYER = Symbol(
  'RoomAvaialabilityReadLayer',
);
