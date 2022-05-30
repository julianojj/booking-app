import { BookingRepository } from '../../../domain/repositories/BookingRepository'
import { Booking } from '../../../domain/entities/Booking'

export class BookingRepositoryInMemory implements BookingRepository {
    bookings: Array<Booking>

    constructor() {
        this.bookings = new Array<Booking>(
            new Booking('73d7f728-9be5-4504-96d7-e336f821cd48', '196e4f85-ddb0-4e55-8cca-fdedf5b41a2a', new Date('2022-06-01T14:00:00'), new Date('2022-06-03T11:00:00')),
        )
    }

    async findAll(): Promise<Booking[]> {
        return this.bookings
    }

    async save(booking: Booking): Promise<void> {
        this.bookings.push(booking)
    }
}
