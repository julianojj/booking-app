import { BookingRepository } from '../../../domain/repositories/BookingRepository'
import { GetBookingsOutput } from './GetBookingsOutput'

export class GetBookings {
    constructor (
        private bookingsRepository: BookingRepository
    ) { }

    async execute(): Promise<GetBookingsOutput[]> { 
        const rooms = await this.bookingsRepository.findAll()
        const output: GetBookingsOutput[] = []
        for (const room of rooms) {
            output.push(new GetBookingsOutput(room.id, room.roomId, room.checkin, room.checkout))
        }
        return output
    }
}
