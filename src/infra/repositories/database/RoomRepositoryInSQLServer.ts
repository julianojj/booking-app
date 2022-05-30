import { TYPES } from 'mssql'
import { Room } from '../../../domain/entities/Room'
import { RoomRepository } from '../../../domain/repositories/RoomRepository'
import database from '../../database/database'

export class RoomRepositoryInSQLServer implements RoomRepository {
    async save(room: Room): Promise<void> {
        const conn = await database.connect()
        await conn.request()
            .input('id', TYPES.VarChar, room.id)
            .input('capacity', TYPES.Int, room.capacity)
            .input('price', TYPES.Float, room.price)
            .input('description', TYPES.VarChar, room.description)
            .input('isAvailable', TYPES.TinyInt, room.isAvailable)
            .query('INSERT INTO Rooms(Id, Capacity, Price, Description, IsAvailable) VALUES(@id, @capacity, @price, @description, @isAvailable)')
        await conn.close()
    }

    async findById(roomId: string): Promise<Room> {
        const conn = await database.connect()
        const roomData = await conn.request()
            .input('id', TYPES.VarChar, roomId)
            .query('SELECT * FROM Rooms WHERE Id = @id')
        let room: Room = null
        for (const data of roomData.recordset) {
            room = new Room(data.Id, data.Capacity, data.Price, data.Description, data.IsAvailable)
        }
        return room
    }

    async findAll(): Promise<Room[]> {
        const conn = await database.connect()
        const roomData = await conn.query('SELECT * FROM Rooms')
        const rooms: Room[] = []
        for (const data of roomData.recordset) {
            rooms.push(new Room(data.Id, data.Capacity, data.Price, data.Description, data.IsAvailable))
        }
        return rooms
    }

    async update(roomId: string, room: Partial<Room>): Promise<void> {
        const conn = await database.connect()
        await conn.request()
            .input('id', TYPES.VarChar, roomId)
            .input('capacity', TYPES.Int, room.capacity)
            .input('price', TYPES.Float, room.price)
            .input('description', TYPES.VarChar, room.description)
            .input('isAvailable', TYPES.TinyInt, room.isAvailable)
            .query('UPDATE Rooms SET Capacity = @capacity, Price = @price, Description = @description, IsAvailable = @isAvailable WHERE Id = @id')
        await conn.close()
    }
}
