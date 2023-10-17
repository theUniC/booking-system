import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Booking } from './domainmodel/Booking';
import { PostBookingsController } from './post-bookings.controller';
import { BookRoomCommandHandler } from './application/BookRoomCommandHandler';
import { BOOKING_REPOSITORY } from './domainmodel/BookingRepository';
import { TypeOrmBookingRepository } from './infrastructure/TypeOrmBookingRepository';
import { CqrsModule } from '@nestjs/cqrs';
import { ROOM_AVAILABILITY_READ_LAYER } from './infrastructure/RoomAvailabilityReadLayer';
import { GetAvailableRoomsController } from './get-available-rooms.controller';
import { GetFreeRoomsQueryHandler } from './application/GetFreeRoomsQueryHandler';
import { RoomWasBookedEventHandler } from './infrastructure/RoomWasBookedEventHandler';
import Redis from 'ioredis';
import { RedisRoomAvailabilityReadLayer } from './infrastructure/RedisRoomAvailabilityReadLayer';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService): TypeOrmModuleOptions => ({
        type: config.getOrThrow('DATABASE_DRIVER'),
        url: config.getOrThrow('DATABASE_URL'),
        autoLoadEntities: true,
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Booking]),
    CqrsModule,
  ],
  controllers: [PostBookingsController, GetAvailableRoomsController],
  providers: [
    {
      provide: BOOKING_REPOSITORY,
      useClass: TypeOrmBookingRepository,
    },
    BookRoomCommandHandler,
    {
      provide: ROOM_AVAILABILITY_READ_LAYER,
      useClass: RedisRoomAvailabilityReadLayer,
    },
    {
      provide: Redis,
      useFactory: (config: ConfigService) =>
        new Redis(config.getOrThrow('REDIS_URL')),
      inject: [ConfigService],
    },
    GetFreeRoomsQueryHandler,
    RoomWasBookedEventHandler,
  ],
})
export class AppModule {}
