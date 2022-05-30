import { Booking } from '../../../domain/entities/Booking'
import { BookingRepository } from '../../../domain/repositories/BookingRepository'
import { RoomRepository } from '../../../domain/repositories/RoomRepository'
import { MakeBookingInput } from './MakeBookingInput'

export class MakeBooking {
    constructor(
        private roomRepository: RoomRepository,
        private bookingRepository: BookingRepository
    ) { }

    async execute(input: MakeBookingInput): Promise<void> {
        const room = await this.roomRepository.findById(input.roomId)
        if (!room) throw new Error('room not found')
        if (room.isOverflow(input.guestsTotal)) throw new Error('capacity is overflow')
        if (!room.isAvailable) throw new Error('no available')
        const booking = new Booking(input.id, room.id, input.checkin, input.checkout)
        await this.roomRepository.update(room.id, { ...room, isAvailable: false })
        await this.bookingRepository.save(booking)
    }
}
