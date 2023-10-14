import { expect } from '@jest/globals';
import { InvalidDateRangeProvided } from '../domainmodel/InvalidDateRangeProvided';
import { GetFreeRoomsQuery } from './GetFreeRoomsQuery';
import { GetFreeRoomsQueryHandler } from './GetFreeRoomsQueryHandler';
import { addDays } from 'date-fns';

describe('GetFreeRoomsQueryHandler', () => {
  it('should throw an invalid date range exception when arrival date is after departure date', () => {
    const queryHandler = new GetFreeRoomsQueryHandler();
    const query = new GetFreeRoomsQuery(addDays(new Date(), 2), new Date());
    const result = queryHandler.execute(query);
    expect(result).rejects.toThrow(InvalidDateRangeProvided);
  });
});
