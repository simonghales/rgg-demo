import {proxy, useProxy} from "valtio";

export const roomsStateProxy = proxy<{
    rooms: {
        [key: string]: {
            meshId: string,
            inside: boolean,
        }
    }
}>({
    rooms: {},
})

export const setInsideRoom = (roomId: string, inside: boolean, meshId?: string) => {
    roomsStateProxy.rooms[roomId] = {
        ...(roomsStateProxy.rooms[roomId] ?? {}),
        ...(meshId ? {meshId} : {}),
        inside,
    }
}

export const useActiveRoom = () => {
    const rooms = useProxy(roomsStateProxy).rooms
    const activeRoom = Object.entries(rooms).find(([id, room]) => {
        return room.inside
    })
    return activeRoom ? activeRoom[0] : ''
}

export const useIsInsideRoom = () => {
    return !!useActiveRoom()
}

export const doorsStateProxy = proxy<{
    doors: {
        [key: string]: {
            open: boolean,
        }
    }
}>({
    doors: {},
})

export const setDoorOpen = (doorId: string, set: (currentState: boolean) => boolean) => {
    doorsStateProxy.doors[doorId] = {
        open: set(doorsStateProxy.doors[doorId]?.open ?? false),
    }
}

export const useIsDoorOpen = (doorId: string) => {
    return useProxy(doorsStateProxy).doors[doorId]?.open ?? false
}