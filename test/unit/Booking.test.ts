import { randomUUID } from 'crypto'
import { Booking } from '../../src/domain/entities/Booking'

test('Should create a booking', () => {
    const id = randomUUID()
    const booking = new Booking(id, '8696c99b-01f8-4818-bcfc-753de2348776', new Date('2022-06-01T14:00:00'), new Date('2022-06-03T11:00:00'))
    expect(booking.id).toBe(id)
})
