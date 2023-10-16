import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { ParseDatePipe } from './parse-date.pipe';
import { QueryBus } from '@nestjs/cqrs';
import { GetFreeRoomsQuery } from './application/GetFreeRoomsQuery';
import { InvalidDateRangeProvided } from './domainmodel/InvalidDateRangeProvided';

@Controller()
export class GetAvailableRoomsController {
  constructor(readonly queryBus: QueryBus) {}

  @Get('available-rooms')
  async handleRequest(
    @Query('arrivalDate', ParseDatePipe) arrivalDate: Date,
    @Query('departureDate', ParseDatePipe) departureDate: Date,
  ) {
    try {
      return await this.queryBus.execute(
        new GetFreeRoomsQuery(arrivalDate, departureDate),
      );
    } catch (e) {
      if (e instanceof InvalidDateRangeProvided) {
        throw new BadRequestException(e);
      }

      throw new InternalServerErrorException(e);
    }
  }
}
