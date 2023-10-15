import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { BookRoomInputDto } from './book-room-input.dto';
import { BookRoomCommand } from './application/BookRoomCommand';
import { RoomAlreadyBooked } from './domainmodel/RoomAlreadyBooked';
import { CommandBus } from '@nestjs/cqrs';

@Controller()
export class PostRoomsController {
  constructor(private commandBus: CommandBus) {}

  @Post('rooms')
  @HttpCode(HttpStatus.CREATED)
  async handleRequest(@Body() bookRoomDto: BookRoomInputDto) {
    try {
      await this.commandBus.execute(
        new BookRoomCommand(
          bookRoomDto.clientId,
          bookRoomDto.roomName,
          bookRoomDto.arrivalDate,
          bookRoomDto.departureDate,
        ),
      );
    } catch (e: any) {
      if (e instanceof RoomAlreadyBooked) {
        throw new ConflictException('Room already booked for that period');
      }

      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: e,
      });
    }
  }
}
