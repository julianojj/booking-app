import { request } from 'undici'

test('should create a new room and return status 201', async () => {
    const response = await request('http://localhost:5000/v1/rooms', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            capacity: 3,
            price: 900,
            description: 'Premium',
            isAvailable: true
        })
    })
    expect(response.statusCode).toBe(201)
})

test('should get all rooms and return status 200', async () => {
    const response = await request('http://localhost:5000/v1/rooms')
    expect(response.statusCode).toBe(200)
})

test('should get all bookings and return status 200', async () => {
    const response = await request('http://localhost:5000/v1/bookings')
    expect(response.statusCode).toBe(200)
})

test('should return a 422 if no avaiable', async () => {
    const response = await request('http://localhost:5000/v1/bookings', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            roomId: '196e4f85-ddb0-4e55-8cca-fdedf5b41a2a',
            checkin: '2022-06-01T14:00:00',
            checkout: '2022-06-03T11:00:00',
            guestsTotal: 2,
        })
    })
    expect(response.statusCode).toBe(422)
})
