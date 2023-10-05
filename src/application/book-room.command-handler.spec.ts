import { expect } from '@jest/globals';
import { isAfter, subDays } from 'date-fns';
import { InvalidDateRangeProvided } from '../domainmodel/InvalidDateRangeProvided';
import { BookRoomCommand } from './book-room.command';

class BookRoomCommandHandler {
  async execute(command: BookRoomCommand) {
    if (isAfter(command.from, command.to)) {
      throw new InvalidDateRangeProvided();
    }
  }
}

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
