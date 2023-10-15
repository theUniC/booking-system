import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Booking } from './domainmodel/Booking';
import { PostBookingsController } from './post-bookings.controller';
import { BookRoomCommandHandler } from './application/BookRoomCommandHandler';
import { BOOKING_REPOSITORY } from './domainmodel/BookingRepository';
import { TypeOrmBookingRepository } from './infrastructure/TypeOrmBookingRepository';
import { CqrsModule } from '@nestjs/cqrs';
import { FileRoomAvailabilityReadLayer } from './infrastructure/FileRoomAvailabilityReadLayer';
import { ROOM_AVAILABILITY_READ_LAYER } from './infrastructure/RoomAvailabilityReadLayer';

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
  controllers: [PostBookingsController],
  providers: [
    {
      provide: BOOKING_REPOSITORY,
      useClass: TypeOrmBookingRepository,
    },
    BookRoomCommandHandler,
    {
      provide: ROOM_AVAILABILITY_READ_LAYER,
      useClass: FileRoomAvailabilityReadLayer,
    },
  ],
})
export class AppModule {}
