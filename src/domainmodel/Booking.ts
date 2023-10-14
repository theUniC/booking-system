import { v4 as uuidv4 } from 'uuid';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';
import { RoomWasBooked } from './RoomWasBooked';

export interface BookingOptions {
  clientId: string;
  roomName: string;
  arrivalDate: Date;
  departureDate: Date;
}

@Entity()
export class Booking extends AggregateRoot {
  @PrimaryColumn()
  private bookingId: string;

  @Column()
  private clientId: string;

  @Column()
  private roomName: string;

  @Column({ type: 'timestamptz' })
  private arrivalDate: Date;

  @Column({ type: 'timestamptz' })
  private departureDate: Date;

  constructor(
    bookingId: string,
    clientId: string,
    roomName: string,
    arrivalDate: Date,
    departureDate: Date,
  ) {
    super();
    this.bookingId = bookingId;
    this.clientId = clientId;
    this.roomName = roomName;
    this.arrivalDate = arrivalDate;
    this.departureDate = departureDate;
  }

  public getRoomName(): string {
    return this.roomName;
  }

  public getArrivalDate(): Date {
    return this.arrivalDate;
  }

  public getDepartureDate(): Date {
    return this.departureDate;
  }

  static book({
    arrivalDate,
    clientId,
    departureDate,
    roomName,
  }: BookingOptions): Booking {
    const booking = new Booking(
      uuidv4(),
      clientId,
      roomName,
      arrivalDate,
      departureDate,
    );

    booking.apply(
      new RoomWasBooked(clientId, roomName, arrivalDate, departureDate),
    );

    return booking;
  }
}
