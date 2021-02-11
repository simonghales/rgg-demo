import { get, set } from "local-storage";
import {loadState} from "rgg-editor";
import defaultData from "../data/default.json"

const key = 'RGG_DEMO_VERSION'
const demoVersion = '3'
const getStoredDemoVersion = () => {
    return get(key) ?? ''
}

export const loadDemoData = () => {
    const storedDemoVersion = getStoredDemoVersion()
    if (storedDemoVersion !== demoVersion) {
        loadState(defaultData as any)
        set(key, demoVersion)
    }
}