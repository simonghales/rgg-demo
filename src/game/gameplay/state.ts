import {proxy, useProxy} from "valtio";

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