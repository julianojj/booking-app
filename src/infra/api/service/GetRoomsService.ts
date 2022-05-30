import { Request, Response, NextFunction } from 'express'
import { GetRooms } from '../../../application/usecases/get-rooms/GetRooms'

export class GetRoomsService {
    constructor (
        private getRooms: GetRooms
    ) { }

    async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const rooms = await this.getRooms.execute()
            return res.status(200).json(rooms)
        } catch (err) {
            next(err)
        }
    }
}
