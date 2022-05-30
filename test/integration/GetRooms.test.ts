import { GetRooms } from '../../src/application/usecases/get-rooms/GetRooms'
import { RoomRepositoryInMemory } from '../../src/infra/repositories/memory/RoomRepositoryInMemory'

test('Should get all rooms', async () => {
    const roomRepository = new RoomRepositoryInMemory()
    const getRooms = new GetRooms(roomRepository)
    const rooms = await getRooms.execute()
    expect(rooms).toHaveLength(2)
})
