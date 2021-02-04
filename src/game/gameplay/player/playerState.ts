import {proxy} from "valtio";

export const playerStateProxy = proxy({
    moving: false,
})