import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Booking } from './domainmodel/Booking';
import { PostRoomsController } from './post-rooms.controller';
import { BookRoomCommandHandler } from './application/BookRoomCommandHandler';
import { BOOKING_REPOSITORY } from './domainmodel/BookingRepository';
import { TypeOrmBookingRepository } from './infrastructure/TypeOrmBookingRepository';
import { CqrsModule } from '@nestjs/cqrs';
import { ROOM_AVAILABILITY_FILE_PATH } from './infrastructure/FileRoomAvailabilityReadLayer';

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
  controllers: [PostRoomsController],
  providers: [
    {
      provide: BOOKING_REPOSITORY,
      useClass: TypeOrmBookingRepository,
    },
    BookRoomCommandHandler,
  ],
})
export class AppModule {}
