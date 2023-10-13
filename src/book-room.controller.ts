import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { BookRoomInputDto } from './book-room-input.dto';
import { BookRoomCommandHandler } from './application/BookRoomCommandHandler';
import { BookRoomCommand } from './application/BookRoomCommand';
import { RoomAlreadyBooked } from './domainmodel/RoomAlreadyBooked';

@Controller()
export class BookRoomController {
  constructor(private bookRoomCommandHandler: BookRoomCommandHandler) {}

  @Post('rooms')
  @HttpCode(HttpStatus.CREATED)
  async handleRequest(@Body() bookRoomDto: BookRoomInputDto) {
    try {
      await this.bookRoomCommandHandler.execute(
        new BookRoomCommand(
          bookRoomDto.clientId,
          bookRoomDto.roomName,
          bookRoomDto.arrivalDate,
          bookRoomDto.departureDate,
        ),
      );
    } catch (e) {
      if (e instanceof RoomAlreadyBooked) {
        throw new ConflictException('Room already booked for that period');
      }

      throw e;
    }
  }
}
