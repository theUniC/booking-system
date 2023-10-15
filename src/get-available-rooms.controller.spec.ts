import * as request from 'supertest';
import { afterEach, beforeEach, expect } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { InMemoryRoomAvailabilityReadLayer } from './infrastructure/InMemoryRoomAvailabilityReadLayer';
import { ROOM_AVAILABILITY_READ_LAYER } from './infrastructure/RoomAvailabilityReadLayer';

describe('GetRoomsController', () => {
  let app: INestApplication;
  let readLayer: InMemoryRoomAvailabilityReadLayer;

  beforeEach(async () => {
    readLayer = new InMemoryRoomAvailabilityReadLayer();

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ROOM_AVAILABILITY_READ_LAYER)
      .useValue(readLayer)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should return a 400 Bad Request when no dates are provided', async () => {
    const response = await request(app.getHttpServer()).get('/available-rooms');
    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
  });
});
