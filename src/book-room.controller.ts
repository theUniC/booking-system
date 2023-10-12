import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { BookRoomInputDto } from './book-room-input.dto';
import { BookRoomCommandHandler } from './application/BookRoomCommandHandler';
import { BookRoomCommand } from './application/BookRoomCommand';

@Controller()
export class BookRoomController {
  constructor(private bookRoomCommandHandler: BookRoomCommandHandler) {}

  @Post('rooms')
  @HttpCode(HttpStatus.CREATED)
  async handleRequest(@Body() bookRoomDto: BookRoomInputDto) {
    await this.bookRoomCommandHandler.execute(
      new BookRoomCommand(
        bookRoomDto.clientId,
        bookRoomDto.roomName,
        bookRoomDto.arrivalDate,
        bookRoomDto.departureDate,
      ),
    );
  }
}
