import { IsNotEmpty, IsUUID } from 'class-validator';

export class BookRoomInputDto {
  @IsNotEmpty()
  @IsUUID()
  readonly clientId: string;

  @IsNotEmpty()
  readonly roomName: string;

  readonly arrivalDate: Date;
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
