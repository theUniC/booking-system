import { Controller, Get, Query } from '@nestjs/common';
import { ParseDatePipe } from './parse-date.pipe';
import { QueryBus } from '@nestjs/cqrs';
import { GetFreeRoomsQuery } from './application/GetFreeRoomsQuery';

@Controller()
export class GetAvailableRoomsController {
  constructor(readonly queryBus: QueryBus) {}

  @Get('available-rooms')
  async handleRequest(
    @Query('arrivalDate', ParseDatePipe) arrivalDate: Date,
    @Query('departureDate', ParseDatePipe) departureDate: Date,
  ) {
    return await this.queryBus.execute(
      new GetFreeRoomsQuery(arrivalDate, departureDate),
    );
  }
}
