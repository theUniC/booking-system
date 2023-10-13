import { isAfter } from 'date-fns';
import { InvalidDateRangeProvided } from '../domainmodel/InvalidDateRangeProvided';
import {
  BOOKING_REPOSITORY,
  BookingRepository,
} from '../domainmodel/BookingRepository';
import { RoomAlreadyBooked } from '../domainmodel/RoomAlreadyBooked';
import { BookRoomCommand } from './BookRoomCommand';
import { Booking } from '../domainmodel/Booking';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(BookRoomCommand)
export class BookRoomCommandHandler
  implements ICommandHandler<BookRoomCommand>
{
  constructor(
    @Inject(BOOKING_REPOSITORY)
    private readonly bookingRepository: BookingRepository,
  ) {}

  async execute(command: BookRoomCommand) {
    this.assertArrivalDateIsBeforeDepartureDate(
      command.arrivalDate,
      command.departureDate,
    );

    await this.assertRoomIsAvailable(
      command.roomName,
      command.arrivalDate,
      command.departureDate,
    );

    await this.bookingRepository.add(Booking.book(command));
  }

  private assertArrivalDateIsBeforeDepartureDate(from: Date, to: Date) {
    if (isAfter(from, to)) {
      throw new InvalidDateRangeProvided();
    }
  }

  private async assertRoomIsAvailable(roomName: string, from: Date, to: Date) {
    const bookings = await this.bookingRepository.byArrivalAndDepartureDates(
      from,
      to,
    );

    if (bookings.filter((b) => b.getRoomName() === roomName).length > 0) {
      throw new RoomAlreadyBooked();
    }
  }
}
