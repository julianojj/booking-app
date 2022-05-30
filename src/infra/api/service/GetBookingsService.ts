import { Request, Response, NextFunction } from 'express'
import { GetBookings } from '../../../application/usecases/get-bookings/GetBookings'

export class GetBookingsService {
    constructor (
        private getBookings: GetBookings
    ) { }

    async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const bookings = await this.getBookings.execute()
            return res.status(200).json(bookings)
        } catch (err) {
            next(err)
        }
    }
}
