import { Router, Request, Response, NextFunction } from 'express'
import { CreateRoom } from '../../../application/usecases/create-room/CreateRoom'
import { GetRooms } from '../../../application/usecases/get-rooms/GetRooms'
import { RoomRepositoryInSQLServer } from '../../repositories/database/RoomRepositoryInSQLServer'
import { CreateRoomService } from '../service/CreateRoomService'
import { GetRoomsService } from '../service/GetRoomsService'

const router = Router()


router.post('/rooms', async (req: Request, res: Response, next: NextFunction) => {
    const roomRepository = new RoomRepositoryInSQLServer()
    const createRoom = new CreateRoom(roomRepository)
    const createRoomService = new CreateRoomService(createRoom)
    return createRoomService.handle(req, res, next)
})

router.get('/rooms', async (req: Request, res: Response, next: NextFunction) => {
    const roomRepository = new RoomRepositoryInSQLServer()
    const getRooms = new GetRooms(roomRepository)
    const getRoomsService = new GetRoomsService(getRooms)
    return getRoomsService.handle(req, res, next)
})

export default router
