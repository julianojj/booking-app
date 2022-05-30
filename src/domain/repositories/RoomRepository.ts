import { Room } from '../entities/Room'

export interface RoomRepository {
    save(room: Room): Promise<void>
    findById(roomId: string): Promise<Room>
    findAll(): Promise<Room[]>
    update(roomId: string, room: Partial<Room>): Promise<void>
}
