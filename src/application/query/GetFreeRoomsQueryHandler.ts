import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFreeRoomsQuery } from './GetFreeRoomsQuery';
import { areIntervalsOverlapping, isAfter } from 'date-fns';
import { InvalidDateRangeProvided } from '../../domainmodel/InvalidDateRangeProvided';
import {
  ROOM_AVAILABILITY_READ_LAYER,
  RoomAvailabilityReadLayer,
} from './RoomAvailabilityReadLayer';
import { Inject } from '@nestjs/common';
import { Room } from './Room';

@QueryHandler(GetFreeRoomsQuery)
export class GetFreeRoomsQueryHandler
  implements IQueryHandler<GetFreeRoomsQuery>
{
  constructor(
    @Inject(ROOM_AVAILABILITY_READ_LAYER)
    private readonly roomAvailabilityReadLayer: RoomAvailabilityReadLayer,
  ) {}

  async execute({
    arrivalDate,
    departureDate,
  }: GetFreeRoomsQuery): Promise<Room[]> {
    this.assertArrivalDateIsBeforeDepartureDate(arrivalDate, departureDate);

    const availability = await this.roomAvailabilityReadLayer.getAvailability();

    const comparingInterval = { start: arrivalDate, end: departureDate };
    return Object.keys(availability)
      .filter(
        (roomName) =>
          !availability[roomName].some(
            ([bookedArrivalDate, bookedDepartureDate]) =>
              areIntervalsOverlapping(
                comparingInterval,
                {
                  start: bookedArrivalDate,
                  end: bookedDepartureDate,
                },
                { inclusive: true },
              ),
          ),
      )
      .map((roomName) => new Room(roomName));
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
