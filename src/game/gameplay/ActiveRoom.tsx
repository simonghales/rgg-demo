import React, {useEffect} from "react"
import {useStoredMesh} from "react-three-game-engine";
import {cameraProxyState} from "./Camera";
import {ref} from "valtio";

const ActiveRoom: React.FC<{
    id: string,
}> = ({id}) => {

    const mesh = useStoredMesh(id)

    useEffect(() => {
        if (!mesh) return
        cameraProxyState.anchorTarget = ref(mesh)
        return () => {
            cameraProxyState.anchorTarget = null
        }
    }, [mesh])

    return null
}

export default ActiveRoom