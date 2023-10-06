import { BookRoomCommand } from './book-room.command';
import { isAfter } from 'date-fns';
import { InvalidDateRangeProvided } from '../domainmodel/InvalidDateRangeProvided';
import { BookingRepository } from '../domainmodel/BookingRepository';
import { RoomAlreadyBooked } from '../domainmodel/RoomAlreadyBooked';

export class BookRoomCommandHandler {
  constructor(private readonly bookingRepository: BookingRepository) {}

  async execute(command: BookRoomCommand) {
    this.assertArrivalDateIsBeforeDepartureDate(command.from, command.to);
    await this.assertRoomIsAvailable(
      command.roomName,
      command.from,
      command.to,
    );
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
