import { RoomRepository } from '../../../domain/repositories/RoomRepository'
import { GetRoomsOutput } from './GetRoomsOutput'

export class GetRooms {
    constructor (
        private roomRepository: RoomRepository
    ) { }

    async execute(): Promise<GetRoomsOutput[]> { 
        const rooms = await this.roomRepository.findAll()
        const output: GetRoomsOutput[] = []
        for (const room of rooms) {
            output.push(new GetRoomsOutput(room.id, room.capacity, room.price, room.description, room.isAvailable))
        }
        return output
    }
}
