export class BookRoomCommand {
  constructor(
    readonly clientId: string,
    readonly roomName: string,
    readonly from: Date,
    readonly to: Date,
  ) {}
}
