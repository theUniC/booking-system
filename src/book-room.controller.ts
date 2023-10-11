import { Body, Controller, Post } from '@nestjs/common';
import { BookRoomInputDto } from './book-room-input.dto';

@Controller()
export class BookRoomController {
  @Post('rooms')
  async handleRequest(@Body() bookRoomDto: BookRoomInputDto) {
    return undefined;
  }
}
