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
import {
  CommandHandler,
  EventBus,
  EventPublisher,
  ICommandHandler,
} from '@nestjs/cqrs';

@CommandHandler(BookRoomCommand)
export class BookRoomCommandHandler
  implements ICommandHandler<BookRoomCommand>
{
  constructor(
    @Inject(BOOKING_REPOSITORY)
    private readonly bookingRepository: BookingRepository,
    private readonly eventBus: EventBus,
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

    const booking = Booking.book(command);
    await this.bookingRepository.add(booking);
    this.eventBus.publishAll(booking.getUncommittedEvents());
  }

  private assertArrivalDateIsBeforeDepartureDate(
    arrivalDate: Date,
    departureDate: Date,
  ) {
    if (isAfter(arrivalDate, departureDate)) {
      throw new InvalidDateRangeProvided();
    }
  }

  private async assertRoomIsAvailable(
    roomName: string,
    arrivalDate: Date,
    departureDate: Date,
  ) {
    const bookings = await this.bookingRepository.byArrivalAndDepartureDates(
      arrivalDate,
      departureDate,
    );

    if (bookings.filter((b) => b.getRoomName() === roomName).length > 0) {
      throw new RoomAlreadyBooked();
    }
  }
}
