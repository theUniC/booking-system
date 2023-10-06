import { Booking } from './Booking';

export interface BookingRepository {
  byArrivalAndDepartureDates(
    arrivalDate: Date,
    departureDate: Date,
  ): Promise<Booking[]>;

  add(booking: Booking): Promise<void>;
}
