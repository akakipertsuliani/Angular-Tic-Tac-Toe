export interface publicGameRoomsData {
    roomName: string,
    creator: {
        uid: string,
        name: string,
    }
    players: number,
}

export interface createRoomInter {
    roomName: string,
    visibility: string,
    creator: {
        uid: string,
        name: string,
        move: boolean,
    }
    rules: string,
    players: number,
}

export interface joinRoomInter {
    opponent: {
        uid: string,
        name: string,
        move: boolean,
    }
    players: number,
}