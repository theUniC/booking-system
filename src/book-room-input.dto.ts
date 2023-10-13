import { IsDate, IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BookRoomInputDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly clientId: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly roomName: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  readonly arrivalDate: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  readonly departureDate: Date;

  constructor(
    clientId: string,
    roomName: string,
    arrivalDate: Date,
    departureDate: Date,
  ) {
    this.clientId = clientId;
    this.roomName = roomName;
    this.arrivalDate = arrivalDate;
    this.departureDate = departureDate;
  }
}
