import {
  AvailabilityMap,
  RoomAvailabilityReadLayer,
} from '../application/query/RoomAvailabilityReadLayer';
import Redis from 'ioredis';
import { parseJSON } from 'date-fns';
import { Inject } from '@nestjs/common';

export class RedisRoomAvailabilityReadLayer
  implements RoomAvailabilityReadLayer
{
  constructor(@Inject(Redis) readonly redis: Redis) {}

  async addBooking(
    roomName: string,
    arrivalDate: Date,
    departureDate: Date,
  ): Promise<void> {
    const availability: Record<string, [string, string][]> = JSON.parse(
      await this.redis.get('room_availability'),
    );

    if (!availability[roomName]) {
      availability[roomName] = [];
    }

    availability[roomName].push([
      arrivalDate.toISOString(),
      departureDate.toISOString(),
    ]);

    await this.redis.set('room_availability', JSON.stringify(availability));
  }

  async getAvailability(): Promise<AvailabilityMap> {
    const rawData: Record<string, [string, string][]> = JSON.parse(
      await this.redis.get('room_availability'),
    );

    const availabilityMap: AvailabilityMap = {};

    Object.keys(rawData).forEach((roomName) => {
      availabilityMap[roomName] = rawData[roomName].map(
        ([arrivalDate, departureDate]) => [
          parseJSON(arrivalDate),
          parseJSON(departureDate),
        ],
      );
    });

    return availabilityMap;
  }
}
