import React, {useEffect, useRef} from "react"
import {Object3D} from "three";
import {useStoreMesh} from "react-three-game-engine";
import { Box } from "@react-three/drei";
import {proxy, subscribe} from "valtio";

export const playerTorchTargetStateProxy = proxy({
    position: {
        x: 0,
        y: 0,
    }
})

const PlayerTorchTarget: React.FC = () => {

    const ref = useRef(null as unknown as Object3D)

    useStoreMesh('torchTarget', ref.current)

    useEffect(() => {

        return subscribe(playerTorchTargetStateProxy.position, () => {
            ref.current.position.x = playerTorchTargetStateProxy.position.x
            ref.current.position.y = playerTorchTargetStateProxy.position.y
            ref.current.position.z = 0
        })

    }, [])

    return (
        <group ref={ref}/>
    )
}

export default PlayerTorchTarget