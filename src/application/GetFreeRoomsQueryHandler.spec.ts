import { expect } from '@jest/globals';
import { InvalidDateRangeProvided } from '../domainmodel/InvalidDateRangeProvided';
import { GetFreeRoomsQuery } from './GetFreeRoomsQuery';
import { GetFreeRoomsQueryHandler } from './GetFreeRoomsQueryHandler';
import { addDays } from 'date-fns';
import { RoomAvailabilityReadLayer } from '../domainmodel/RoomAvailabilityReadLayer';

describe('GetFreeRoomsQueryHandler', () => {
  it('should throw an invalid date range exception when arrival date is after departure date', () => {
    const readLayer = new (class implements RoomAvailabilityReadLayer {
      async getAvailability(
        _arrivalDate: Date,
        _departureDate: Date,
      ): Promise<Record<string, [[Date, Date]]>> {
        return {};
      }
    })();

    const queryHandler = new GetFreeRoomsQueryHandler(readLayer);
    const query = new GetFreeRoomsQuery(addDays(new Date(), 2), new Date());
    const result = queryHandler.execute(query);
    expect(result).rejects.toThrow(InvalidDateRangeProvided);
  });

  it('should return an empty list of free rooms when there are no rooms registered', async () => {
    const readLayer = new (class implements RoomAvailabilityReadLayer {
      async getAvailability(
        _arrivalDate: Date,
        _departureDate: Date,
      ): Promise<Record<string, [[Date, Date]]>> {
        return {};
      }
    })();

    const queryHandler = new GetFreeRoomsQueryHandler(readLayer);
    const arrivalDate = new Date();
    const query = new GetFreeRoomsQuery(arrivalDate, addDays(arrivalDate, 2));
    const result = await queryHandler.execute(query);
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(0);
  });
});
