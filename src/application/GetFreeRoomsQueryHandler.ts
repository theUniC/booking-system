import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFreeRoomsQuery } from './GetFreeRoomsQuery';
import { isAfter } from 'date-fns';
import { InvalidDateRangeProvided } from '../domainmodel/InvalidDateRangeProvided';
import { Room } from '../domainmodel/Room';
import { RoomAvailabilityReadLayer } from '../domainmodel/RoomAvailabilityReadLayer';

@QueryHandler(GetFreeRoomsQuery)
export class GetFreeRoomsQueryHandler
  implements IQueryHandler<GetFreeRoomsQuery>
{
  constructor(
    private readonly roomAvailabilityReadLayer: RoomAvailabilityReadLayer,
  ) {}

  async execute({
    arrivalDate,
    departureDate,
  }: GetFreeRoomsQuery): Promise<Room[]> {
    this.assertArrivalDateIsBeforeDepartureDate(arrivalDate, departureDate);

    const availability = await this.roomAvailabilityReadLayer.getAvailability(
      arrivalDate,
      departureDate,
    );

    return Object.keys(availability).map((roomName) => new Room(roomName));
  }

  private assertArrivalDateIsBeforeDepartureDate(
    arrivalDate: Date,
    departureDate: Date,
  ) {
    if (isAfter(arrivalDate, departureDate)) {
      throw new InvalidDateRangeProvided();
    }
  }
}
