import { randomUUID } from 'crypto'
import { Room } from '../../src/domain/entities/Room'

test('Should create a room', () => {
    const id = randomUUID()
    const room = new Room(id, 2, 700, 'Quarto Standard', true)
    expect(room.id).toBe(id)
})

test('The price should be greater or equals than 1', () => {
    const id = randomUUID()
    expect(() => new Room(id, 2, -1, 'Quarto Standard', true)).toThrowError('invalid price to room')
})
