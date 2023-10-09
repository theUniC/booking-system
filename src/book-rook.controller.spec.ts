import { BookRoomController } from './book-room.controller';
import { beforeEach, expect } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

describe('BookRoomController', () => {
  let bookRoomController: BookRoomController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BookRoomController],
    }).compile();

    bookRoomController = app.get(BookRoomController);
  });

  it('should return a 400 when invalid data is sent', () => {
    const bookRoomDto = {};
    expect(bookRoomController.handleRequest(bookRoomDto)).rejects.toThrow(
      BadRequestException,
    );
  });
});
