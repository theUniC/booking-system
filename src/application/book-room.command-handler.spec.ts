import { expect } from '@jest/globals';
import { addDays, subDays } from 'date-fns';
import { InvalidDateRangeProvided } from '../domainmodel/InvalidDateRangeProvided';
import { BookRoomCommand } from './book-room.command';
import { BookRoomCommandHandler } from './book-room.command-handler';
import { RoomAlreadyBooked } from '../domainmodel/RoomAlreadyBooked';

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

  it('should throw an exception when the room is already booked', async () => {
    const commandHandler = new BookRoomCommandHandler();
    const departureDate = new Date();

    await commandHandler.execute(
      new BookRoomCommand(
        'test',
        'test',
        departureDate,
        addDays(departureDate, 2),
      ),
    );

    const result = commandHandler.execute(
      new BookRoomCommand(
        'test1',
        'test',
        departureDate,
        subDays(departureDate, 2),
      ),
    );

    expect(result).rejects.toThrow(RoomAlreadyBooked);
  });
});
