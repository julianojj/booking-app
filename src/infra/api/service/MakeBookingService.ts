import { randomUUID } from 'crypto'
import { Request, Response, NextFunction } from 'express'
import { MakeBooking } from '../../../application/usecases/make-booking/MakeBooking'

export class MakeBookingService {
    constructor (
        private makeBooking: MakeBooking
    ) { }

    async handle(req: Request, res: Response, next: NextFunction) {
        try {
            req.body.id = randomUUID()
            await this.makeBooking.execute(req.body)
            return res.status(201).end()
        } catch (err) {
            next(err)
        }
    }
}
