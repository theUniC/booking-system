import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Booking } from './domainmodel/Booking';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
