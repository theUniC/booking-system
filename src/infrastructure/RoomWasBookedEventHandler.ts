import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RoomWasBooked } from '../domainmodel/RoomWasBooked';
import {
  ROOM_AVAILABILITY_READ_LAYER,
  RoomAvailabilityReadLayer,
} from './RoomAvailabilityReadLayer';
import { Inject } from '@nestjs/common';

@EventsHandler(RoomWasBooked)
export class RoomWasBookedEventHandler implements IEventHandler<RoomWasBooked> {
  constructor(
    @Inject(ROOM_AVAILABILITY_READ_LAYER)
    readonly readLayer: RoomAvailabilityReadLayer,
  ) {}

  async handle({ arrivalDate, departureDate, roomName }: RoomWasBooked) {
    await this.readLayer.addBooking(roomName, arrivalDate, departureDate);
  }
}
