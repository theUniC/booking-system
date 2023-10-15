export type AvailabilityMap = Record<string, [Date, Date][]>;

export interface RoomAvailabilityReadLayer {
  getAvailability(): Promise<AvailabilityMap>;
}
