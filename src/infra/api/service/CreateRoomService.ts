import { randomUUID } from 'crypto'
import { Request, Response, NextFunction } from 'express'
import { CreateRoom } from '../../../application/usecases/create-room/CreateRoom'

export class CreateRoomService {
    constructor (
        private createRoom: CreateRoom
    ) { }

    async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { capacity, price, description } = req.body
            if (!capacity) throw new Error('capacity is required')
            if (!price) throw new Error('price is required')
            if (!description) throw new Error('description is required')
            req.body.id = randomUUID()
            await this.createRoom.execute(req.body)
            return res.status(201).end()
        } catch (err) {
            next(err)
        }
    }
}
