import { BookRoomCommand } from './book-room.command';
import { isAfter } from 'date-fns';
import { InvalidDateRangeProvided } from '../domainmodel/InvalidDateRangeProvided';

export class BookRoomCommandHandler {
  async execute(command: BookRoomCommand) {
    if (isAfter(command.from, command.to)) {
      throw new InvalidDateRangeProvided();
    }
  }
}
