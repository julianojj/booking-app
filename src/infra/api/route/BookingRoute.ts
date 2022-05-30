import { Router, Request, Response, NextFunction } from 'express'
import { GetBookings } from '../../../application/usecases/get-bookings/GetBookings'
import { MakeBooking } from '../../../application/usecases/make-booking/MakeBooking'
import { BookingRepositoryInSQLServer } from '../../repositories/database/BookingRepositoryInSQLServer'
import { RoomRepositoryInSQLServer } from '../../repositories/database/RoomRepositoryInSQLServer'
import { GetBookingsService } from '../service/GetBookingsService'
import { MakeBookingService } from '../service/MakeBookingService'

const router = Router()

router.post('/bookings', async (req: Request, res: Response, next: NextFunction) => {
    const roomRepository = new RoomRepositoryInSQLServer()
    const bookingRepository = new BookingRepositoryInSQLServer()
    const makeBooking = new MakeBooking(roomRepository, bookingRepository)
    const makeBookingService = new MakeBookingService(makeBooking)
    return makeBookingService.handle(req, res, next)
})

router.get('/bookings', async (req: Request, res: Response, next: NextFunction) => {
    const bookingRepository = new BookingRepositoryInSQLServer()
    const getBookings = new GetBookings(bookingRepository)
    const getBookingsService = new GetBookingsService(getBookings)
    return getBookingsService.handle(req, res, next)
})

export default router
