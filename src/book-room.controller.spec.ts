import * as request from 'supertest';
import { beforeAll, expect } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { BookRoomInputDto } from './book-room-input.dto';
import { addDays } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { AppModule } from './app.module';

describe('BookRoomController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const INVALID_CLIENT_ID = '';
  const ANOTHER_INVALID_CLIENT_ID = 'invalid-client-id';
  const INVALID_ROOM_NAME = '';
  const VALID_ROOM_NAME = 'test';

  const invalidInputData = [
    [INVALID_CLIENT_ID, VALID_ROOM_NAME],
    [uuidv4(), INVALID_ROOM_NAME],
    [INVALID_CLIENT_ID, INVALID_ROOM_NAME],
    [ANOTHER_INVALID_CLIENT_ID, VALID_ROOM_NAME],
  ];

  it.each(invalidInputData)(
    'should return a 400 when invalid data is sent',
    async (clientId, roomName) => {
      const bookRoomDto = new BookRoomInputDto(
        clientId,
        roomName,
        new Date(),
        addDays(new Date(), 2),
      );

      const response = await request(app.getHttpServer())
        .post('/rooms')
        .send(bookRoomDto);

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    },
  );

  it('should book a room successfully', async () => {
    const bookRoomDto = new BookRoomInputDto(
      uuidv4(),
      VALID_ROOM_NAME,
      new Date(),
      addDays(new Date(), 2),
    );

    const response = await request(app.getHttpServer())
      .post('/rooms')
      .send(bookRoomDto);

    expect(response.status).toBe(HttpStatus.CREATED);
  });
});
