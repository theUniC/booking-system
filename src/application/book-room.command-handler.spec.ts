import { expect } from '@jest/globals';
import { InvalidDateRangeProvided } from '../domainmodel/InvalidDateRangeProvided';

describe('BookRoom', () => {
  it('should throw an exception when departure date is before arrival date', () => {
    expect(result).rejects.toThrow(InvalidDateRangeProvided);
  });
});
