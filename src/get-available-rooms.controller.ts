import { Controller, Get, Query } from '@nestjs/common';
import { ParseDatePipe } from './parse-date.pipe';

@Controller()
export class GetAvailableRoomsController {
  @Get('available-rooms')
  async handleRequest(
    @Query('arrivalDate', ParseDatePipe) arrivalDate: Date,
    @Query('departureDate', ParseDatePipe) departureDate: Date,
  ) {
    return {};
  }
}
