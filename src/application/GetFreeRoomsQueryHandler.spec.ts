import { expect } from '@jest/globals';
import { InvalidDateRangeProvided } from '../domainmodel/InvalidDateRangeProvided';
import { GetFreeRoomsQuery } from './GetFreeRoomsQuery';
import { GetFreeRoomsQueryHandler } from './GetFreeRoomsQueryHandler';

describe('GetFreeRoomsQueryHandler', () => {
  it('should throw an invalid date range exception when arrival date is after departure date', () => {
    const queryHandler = new GetFreeRoomsQueryHandler();
    const query = new GetFreeRoomsQuery();
    const result = queryHandler.execute(query);
    expect(result).rejects.toThrow(InvalidDateRangeProvided);
  });
});
