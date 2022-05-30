export class MakeBookingInput {
    constructor(
        readonly id: string,
        readonly roomId: string,
        readonly checkin: Date,
        readonly checkout: Date,
        readonly guestsTotal: number,
    ) { }
}
