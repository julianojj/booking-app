export class Room {
    isAvailable: boolean
    
    constructor(
        readonly id: string,
        readonly capacity: number,
        readonly price: number,
        readonly description: string,
        isAvailable: boolean,
    ) { 
        if (this.price < 0) throw new Error('invalid price to room')
        this.isAvailable = isAvailable
    }

    isOverflow(guestsTotal: number): boolean {
        return guestsTotal > this.capacity
    }
}
