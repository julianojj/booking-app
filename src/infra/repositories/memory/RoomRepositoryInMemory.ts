import { RoomRepository } from '../../../domain/repositories/RoomRepository'
import { Room } from '../../../domain/entities/Room'

export class RoomRepositoryInMemory implements RoomRepository {
    rooms: Array<Room>

    constructor() {
        this.rooms = new Array<Room>(
            new Room('8220d9c9-e752-4812-a339-21c6ef455779', 2, 700, 'Quarto Standard', true),
            new Room('82cf3e5a-013f-4c32-a5a1-77ea1ca1f7e5', 3, 1300, 'Quarto Plus', true)
        )
    }

    async findById(roomId: string): Promise<Room> {
        return this.rooms.find(room => room.id === roomId)
    }

    async findAll(): Promise<Room[]> {
        return this.rooms
    }

    async save(room: Room): Promise<void> {
        this.rooms.push(room)
    }

    async update(roomId: string, room: Partial<Room>): Promise<void> {
        this.rooms.forEach((value, index) => {
            if (value.id === roomId) {
                this.rooms[index].isAvailable = room.isAvailable
            }
        })
    }
}
