import {
  AvailabilityMap,
  RoomAvailabilityReadLayer,
} from './RoomAvailabilityReadLayer';
import * as path from 'path';
import { parseJSON } from 'date-fns';

export const ROOM_AVAILABILITY_FILE_PATH = path.join(
  __dirname,
  '/resources/room-availability.json',
);

export class FileRoomAvailabilityReadLayer
  implements RoomAvailabilityReadLayer
{
  async getAvailability(): Promise<AvailabilityMap> {
    const rawData: Record<string, [string, string][]> = JSON.parse(
      ROOM_AVAILABILITY_FILE_PATH,
    );

    const availabilityMap: AvailabilityMap = {};

    Object.keys(availabilityMap).forEach((roomName) => {
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
