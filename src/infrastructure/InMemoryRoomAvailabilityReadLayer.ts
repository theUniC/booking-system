import {
  AvailabilityMap,
  RoomAvailabilityReadLayer,
} from '../application/query/RoomAvailabilityReadLayer';

export class InMemoryRoomAvailabilityReadLayer
  implements RoomAvailabilityReadLayer
{
  private availability: AvailabilityMap = {};

  async getAvailability(): Promise<AvailabilityMap> {
    return this.availability;
  }

  async addBooking(roomName: string, arrivalDate: Date, departureDate: Date) {
    if (!this.availability[roomName]) {
      this.availability[roomName] = [];
    }

    this.availability[roomName].push([arrivalDate, departureDate]);
  }
}
