import { BookingRepositoryInMemory } from '../../src/infra/repositories/memory/BookingRepositoryInMemory'
import { RoomRepositoryInMemory } from '../../src/infra/repositories/memory/RoomRepositoryInMemory'
import { MakeBooking } from '../../src/application/usecases/make-booking/MakeBooking'
import { RoomRepository } from '../../src/domain/repositories/RoomRepository'
import { BookingRepository } from '../../src/domain/repositories/BookingRepository'
import { randomUUID } from 'crypto'

let roomRepository: RoomRepository
let bookingRepository: BookingRepository

beforeEach(() => {
    roomRepository = new RoomRepositoryInMemory()
    bookingRepository = new BookingRepositoryInMemory()
})

test('Should not make a booking if no room avaiable', async () => {
    const makeBooking = new MakeBooking(roomRepository, bookingRepository)
    const id = randomUUID()
    const input = {
        id,
        roomId: '8220d9c9-e752-4812-a339-21c6ef455779',
        checkin: new Date('2022-06-01T14:00:00'),
        checkout: new Date('2022-06-03T11:00:00'),
        guestsTotal: 2,
    }
    await makeBooking.execute(input)
    await expect(makeBooking.execute(input)).rejects.toThrowError('no available')
})

test('Should not make a bookin if room not exists', async () => {
    const makeBooking = new MakeBooking(roomRepository, bookingRepository)
    const id = randomUUID()
    const input = {
        id,
        roomId: '8220d9c9-e752-4812-a339-21c6ef455710',
        checkin: new Date('2022-06-01T14:00:00'),
        checkout: new Date('2022-06-03T11:00:00'),
        guestsTotal: 2,
    }
    await expect(makeBooking.execute(input)).rejects.toThrowError('room not found')
})

test('Should not make a booking if guestsTotal is more than capacity', async () => {
    const makeBooking = new MakeBooking(roomRepository, bookingRepository)
    const id = randomUUID()
    const input = {
        id,
        roomId: '8220d9c9-e752-4812-a339-21c6ef455779',
        checkin: new Date('2022-06-01T14:00:00'),
        checkout: new Date('2022-06-03T11:00:00'),
        guestsTotal: 3,
    }
    await expect(makeBooking.execute(input)).rejects.toThrowError('capacity is overflow')
})
