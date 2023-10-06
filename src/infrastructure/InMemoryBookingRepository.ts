import { BookingRepository } from '../domainmodel/BookingRepository';
import { Booking } from '../domainmodel/Booking';
import { areIntervalsOverlapping } from 'date-fns';

export class InMemoryBookingRepository implements BookingRepository {
  private bookings: Booking[] = [];

  async add(booking: Booking): Promise<void> {
    this.bookings.push(booking);
  }

  async byArrivalAndDepartureDates(
    arrivalDate: Date,
    departureDate: Date,
  ): Promise<Booking[]> {
    return this.bookings.filter((booking) =>
      areIntervalsOverlapping(
        {
          start: booking.getArrivalDate(),
          end: booking.getDepartureDate(),
        },
        { start: arrivalDate, end: departureDate },
      ),
    );
  }
}
