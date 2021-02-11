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

export const setDoorOpen = (doorId: string) => {
    doorsStateProxy.doors[doorId] = {
        open: true,
    }
}

export const useIsDoorOpen = (doorId: string) => {
    return useProxy(doorsStateProxy).doors[doorId]?.open ?? false
}