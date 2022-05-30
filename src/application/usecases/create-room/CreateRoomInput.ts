export class CreateRoomInput {
    constructor(
        readonly id: string,
        readonly capacity: number,
        readonly price: number,
        readonly description: string,
        readonly isAvailable: boolean,
    ) { }
}
