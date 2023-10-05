import { BookRoomCommand } from './book-room.command';
import { isAfter } from 'date-fns';
import { InvalidDateRangeProvided } from '../domainmodel/InvalidDateRangeProvided';

export class BookRoomCommandHandler {
  async execute(command: BookRoomCommand) {
    this.assertArrivalDateIsBeforeDepartureDate(command.from, command.to);
  }

  private assertArrivalDateIsBeforeDepartureDate(from: Date, to: Date) {
    if (isAfter(from, to)) {
      throw new InvalidDateRangeProvided();
    }
  }
}
