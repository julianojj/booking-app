import { BookingRepository } from '../../../domain/repositories/BookingRepository'
import { Booking } from '../../../domain/entities/Booking'
import database from '../../database/database'
import { TYPES } from 'mssql'

export class BookingRepositoryInSQLServer implements BookingRepository {
    async save(booking: Booking): Promise<void> {
        const conn = await database.connect()
        await conn.request()
            .input('id', TYPES.VarChar, booking.id)
            .input('roomId', TYPES.VarChar, booking.roomId)
            .input('checkin', TYPES.DateTime, booking.checkin)
            .input('checkout', TYPES.DateTime, booking.checkout)
            .query('INSERT INTO Bookings(Id, RoomId, CheckIn, CheckOut) VALUES(@id, @roomId, @checkin, @checkout)')
        await conn.close()
    }

    async findAll(): Promise<Booking[]> {
        const conn = await database.connect()
        const bookingsData = await conn.query('SELECT * FROM Bookings')
        const bookings: Booking[] = []
        for (const data of bookingsData.recordset) {
            bookings.push(new Booking(data.Id, data.RoomId, data.CheckIn, data.CheckOut))
        }
        return bookings
    }
}
