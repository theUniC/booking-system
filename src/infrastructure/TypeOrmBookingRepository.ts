import { BookingRepository } from '../domainmodel/BookingRepository';
import { Booking } from '../domainmodel/Booking';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmBookingRepository implements BookingRepository {
  constructor(
    @InjectRepository(Booking)
    private typeOrmBookingRepository: Repository<Booking>,
  ) {}

  async add(booking: Booking): Promise<void> {
    await this.typeOrmBookingRepository.save(booking);
  }

  async byArrivalAndDepartureDates(
    arrivalDate: Date,
    departureDate: Date,
  ): Promise<Booking[]> {
    return await this.typeOrmBookingRepository
      .createQueryBuilder()
      .where('arrivalDate >= :arrivalDate', { arrivalDate })
      .andWhere('departureDate >= :departureDate', { departureDate })
      .getMany();
  }
}
