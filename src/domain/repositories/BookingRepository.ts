import { Booking } from '../entities/Booking'

export interface BookingRepository {
    save(booking: Booking): Promise<void>
    findAll(): Promise<Booking[]>
}
