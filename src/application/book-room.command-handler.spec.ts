import { expect } from '@jest/globals';
import { subDays } from 'date-fns';
import { InvalidDateRangeProvided } from '../domainmodel/InvalidDateRangeProvided';
import { BookRoomCommand } from './book-room.command';
import { BookRoomCommandHandler } from './book-room.command-handler';

describe('BookRoom', () => {
  it('should throw an exception when departure date is before arrival date', async () => {
    const commandHandler = new BookRoomCommandHandler();
    const command = new BookRoomCommand(
      'test',
      'test',
      new Date(),
      subDays(new Date(), 2),
    );

    const result = commandHandler.execute(command);
    expect(result).rejects.toThrow(InvalidDateRangeProvided);
  });
});
