import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFreeRoomsQuery } from './GetFreeRoomsQuery';
import { isAfter } from 'date-fns';
import { InvalidDateRangeProvided } from '../domainmodel/InvalidDateRangeProvided';

@QueryHandler(GetFreeRoomsQuery)
export class GetFreeRoomsQueryHandler
  implements IQueryHandler<GetFreeRoomsQuery>
{
  async execute({
    arrivalDate,
    departureDate,
  }: GetFreeRoomsQuery): Promise<any> {
    this.assertArrivalDateIsBeforeDepartureDate(arrivalDate, departureDate);

    return [];
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
