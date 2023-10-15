import {
  AvailabilityMap,
  RoomAvailabilityReadLayer,
} from '../domainmodel/RoomAvailabilityReadLayer';

export class InMemoryRoomAvailabilityReadLayer
  implements RoomAvailabilityReadLayer
{
  private availability: AvailabilityMap = {};

  async getAvailability(
    _arrivalDate: Date,
    _departureDate: Date,
  ): Promise<AvailabilityMap> {
    return this.availability;
  }

  async addBooking(roomName: string, arrivalDate: Date, departureDate: Date) {
    if (!this.availability[roomName]) {
      this.availability[roomName] = [];
    }

    this.availability[roomName].push([arrivalDate, departureDate]);
  }
}
