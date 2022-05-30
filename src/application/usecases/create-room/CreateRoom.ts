import { Room } from '../../../domain/entities/Room'
import { RoomRepository } from '../../../domain/repositories/RoomRepository'
import { CreateRoomInput } from './CreateRoomInput'
import { CreateRoomOutput } from './CreateRoomOutput'

export class CreateRoom {
    constructor(
        private roomRepository: RoomRepository
    ) { }

    async execute(input: CreateRoomInput): Promise<CreateRoomOutput> {
        const room = new Room(input.id, input.capacity, input.price, input.description, input.isAvailable)
        const output = new CreateRoomOutput(room.capacity, room.price, room.description)
        await this.roomRepository.save(room)
        return output
    }
}
