import { Plane } from "@react-three/drei"
import React, {useMemo} from "react"
import {playerTorchTargetStateProxy} from "./PlayerTorchTarget";
import {useStoredMesh} from "react-three-game-engine";

const InteractivePlane: React.FC = () => {

    const player = useStoredMesh('player')

    const {
        onPointerMove,
    } = useMemo(() => {
        return {
            onPointerMove: (event: any) => {
                if (!player) return
                const {x: playerX, y: playerY} = player.position
                const x = event.point.x
                const y = event.point.y
                playerTorchTargetStateProxy.position.x = x - playerX
                playerTorchTargetStateProxy.position.y = y - playerY
            }
        }
    }, [player])

    return (
        <Plane visible={false} args={[128, 128]} position={[0, 0, 0]} onPointerMove={onPointerMove}/>
    )
}

export default InteractivePlane