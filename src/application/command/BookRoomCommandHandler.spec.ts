import { beforeEach, expect } from '@jest/globals';
import { addDays, subDays } from 'date-fns';
import { InvalidDateRangeProvided } from '../../domainmodel/InvalidDateRangeProvided';
import { RoomAlreadyBooked } from '../../domainmodel/RoomAlreadyBooked';
import {
  BOOKING_REPOSITORY,
  BookingRepository,
} from '../../domainmodel/BookingRepository';
import { InMemoryBookingRepository } from '../../infrastructure/InMemoryBookingRepository';
import { Booking } from '../../domainmodel/Booking';
import { BookRoomCommandHandler } from './BookRoomCommandHandler';
import { BookRoomCommand } from './BookRoomCommand';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';

describe('BookRoom', () => {
  let repository: BookingRepository;
  let commandHandler: BookRoomCommandHandler;

  beforeEach(async () => {
    repository = new InMemoryBookingRepository();

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(BOOKING_REPOSITORY)
      .useValue(repository)
      .compile();

    commandHandler = moduleRef.get(BookRoomCommandHandler);
  });

  it('should throw an exception when departure date is before arrival date', async () => {
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
    const arrivalDate = new Date();

    await repository.add(
      Booking.book({
        clientId: 'test',
        roomName: 'test',
        arrivalDate,
        departureDate: addDays(arrivalDate, 2),
      }),
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

  it('should add a new booking to the collection', () => {
    const arrivalDate = new Date();
    const result = commandHandler.execute(
      new BookRoomCommand(
        'test1',
        'test',
        arrivalDate,
        addDays(arrivalDate, 2),
      ),
    );

    expect(result).resolves.toBeUndefined();
  });
});
