import { Box } from "@react-three/drei";
import React, {MutableRefObject, useEffect, useRef} from "react"
import {useStoredMesh} from "react-three-game-engine";
import {Group, Object3D, SpotLight} from "three";
import {useFrame} from "react-three-fiber";
import {calculateVectorBetweenVectors, getVectorMagnitude} from "../../../utils/vectors";
import {subscribe} from "valtio";
import {playerTorchTargetStateProxy} from "./PlayerTorchTarget";
import {useIsInsideRoom} from "../state";

const PlayerTorch: React.FC = () => {

    const groupRef = useRef<Group>()
    const ref = useRef<SpotLight>()

    const target = useStoredMesh('torchTarget')
    const isInsideRoom = useIsInsideRoom()

    useEffect(() => {
        if (!target) return
        if (!ref.current) return
        ref.current.target = target

        return subscribe(playerTorchTargetStateProxy.position, () => {
            if (!groupRef.current) return
            const {x, y} = playerTorchTargetStateProxy.position
            const magnitude = getVectorMagnitude(x, y)
            groupRef.current.position.x = (x / magnitude) * 0.5
            groupRef.current.position.y = (y / magnitude) * 0.5
        })

    }, [target])

    return (
        <group ref={groupRef}>
            <spotLight ref={ref} position={[0, 0, 0.75]} castShadow intensity={isInsideRoom ? 0 : 0.2} shadowBias={-0.01} />
        </group>
    )
}

export default PlayerTorch