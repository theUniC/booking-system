import { expect } from '@jest/globals';
import { InvalidDateRangeProvided } from '../domainmodel/InvalidDateRangeProvided';
import { GetFreeRoomsQuery } from './GetFreeRoomsQuery';
import { GetFreeRoomsQueryHandler } from './GetFreeRoomsQueryHandler';
import { addDays } from 'date-fns';
import {
  AvailabilityMap,
  RoomAvailabilityReadLayer,
} from '../domainmodel/RoomAvailabilityReadLayer';
import { Room } from '../domainmodel/Room';

describe('GetFreeRoomsQueryHandler', () => {
  const readLayer = new (class implements RoomAvailabilityReadLayer {
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
  })();

  const queryHandler = new GetFreeRoomsQueryHandler(readLayer);

  it('should throw an invalid date range exception when arrival date is after departure date', () => {
    const query = new GetFreeRoomsQuery(addDays(new Date(), 2), new Date());
    const result = queryHandler.execute(query);
    expect(result).rejects.toThrow(InvalidDateRangeProvided);
  });

  it('should return an empty list of free rooms when there are no rooms registered', async () => {
    const arrivalDate = new Date();
    const query = new GetFreeRoomsQuery(arrivalDate, addDays(arrivalDate, 2));
    const result = await queryHandler.execute(query);
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(0);
  });

  it('should return the only room available', async () => {
    const arrivalDate = new Date();

    await readLayer.addBooking(
      'test',
      addDays(arrivalDate, 3),
      addDays(arrivalDate, 4),
    );

    const resultWithFreeRooms = await queryHandler.execute(
      new GetFreeRoomsQuery(arrivalDate, addDays(arrivalDate, 2)),
    );
    expect(resultWithFreeRooms).toBeInstanceOf(Array);
    expect(resultWithFreeRooms).toHaveLength(1);
    expect(resultWithFreeRooms.pop()).toBeInstanceOf(Room);

    const resultWithoutFreeRooms = await queryHandler.execute(
      new GetFreeRoomsQuery(arrivalDate, addDays(arrivalDate, 3)),
    );

    expect(resultWithoutFreeRooms).toBeInstanceOf(Array);
    expect(resultWithoutFreeRooms).toHaveLength(0);
  });
});
