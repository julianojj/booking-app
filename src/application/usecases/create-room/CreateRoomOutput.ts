export class CreateRoomOutput {
    constructor(
        readonly capacity: number,
        readonly price: number,
        readonly description: string,
    ) { }
}
