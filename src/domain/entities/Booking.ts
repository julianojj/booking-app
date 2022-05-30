export class Booking {
    constructor(
        readonly id: string,
        readonly roomId: string,
        readonly checkin: Date,
        readonly checkout: Date
    ) { }
}
