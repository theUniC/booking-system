import { IsDate, IsNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class BookRoomInputDto {
  @IsNotEmpty()
  @IsUUID()
  readonly clientId: string;

  @IsNotEmpty()
  readonly roomName: string;

  @IsDate()
  @Type(() => Date)
  readonly arrivalDate: Date;

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
