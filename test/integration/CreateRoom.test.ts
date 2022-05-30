import { randomUUID } from 'crypto'
import { CreateRoom } from '../../src/application/usecases/create-room/CreateRoom'
import { RoomRepositoryInMemory } from '../../src/infra/repositories/memory/RoomRepositoryInMemory'

test('Should create a room', async () => {
    const roomRepository = new RoomRepositoryInMemory()
    const createRoom = new CreateRoom(roomRepository)
    const input = {
        id: randomUUID(),
        capacity: 2, 
        price: 700, 
        description: 'Quarto Standard', 
        isAvailable: false
    }
    await createRoom.execute(input)
    const rooms = roomRepository.rooms
    expect(rooms).toHaveLength(3)
})
