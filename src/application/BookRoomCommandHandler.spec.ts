import { beforeEach, expect } from '@jest/globals';
import { addDays, subDays } from 'date-fns';
import { InvalidDateRangeProvided } from '../domainmodel/InvalidDateRangeProvided';
import { RoomAlreadyBooked } from '../domainmodel/RoomAlreadyBooked';
import { BookingRepository } from '../domainmodel/BookingRepository';
import { InMemoryBookingRepository } from '../infrastructure/InMemoryBookingRepository';
import { Booking } from '../domainmodel/Booking';
import { BookRoomCommandHandler } from './BookRoomCommandHandler';
import { BookRoomCommand } from './BookRoomCommand';

describe('BookRoom', () => {
  let repository: BookingRepository;

  beforeEach(() => {
    repository = new InMemoryBookingRepository();
  });

  it('should throw an exception when departure date is before arrival date', async () => {
    const commandHandler = new BookRoomCommandHandler(repository);
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
    const commandHandler = new BookRoomCommandHandler(repository);
    const arrivalDate = new Date();

    await repository.add(
      new Booking('test', 'test', arrivalDate, addDays(arrivalDate, 2)),
    );

    const result = commandHandler.execute(
      new BookRoomCommand(
        'test1',
        'test',
        arrivalDate,
        addDays(arrivalDate, 2),
      ),
    );

    expect(result).rejects.toThrow(RoomAlreadyBooked);
  });
});
