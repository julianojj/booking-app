import { GetBookings } from '../../src/application/usecases/get-bookings/GetBookings'
import { BookingRepositoryInMemory } from '../../src/infra/repositories/memory/BookingRepositoryInMemory'

test('Should get all books', async () => {
    const bookingRepository = new BookingRepositoryInMemory()
    const getBookings = new GetBookings(bookingRepository)
    const output = await getBookings.execute()
    expect(output).toHaveLength(1)
})
