import { Box } from "@react-three/drei"
import React from "react"
import {EditableGrabbable, useDraggableMesh, useEditableProp, useIsEditMode} from "rgg-editor";
import {BodyType, createBoxFixture, useBody} from "react-three-game-engine";
import {Vec2} from "planck-js/lib";

const Physics: React.FC<{
    x: number,
    y: number,
    width: number,
    height: number,
}> = ({x, y, width, height}) => {

    useBody(() => ({
        type: BodyType.static,
        position: Vec2(x, y),
        fixtures: [createBoxFixture({
            width,
            height,
        })],
    }))

    return null
}

const Barrier: React.FC = () => {

    const isPlaying = !useIsEditMode()

    const {x, y, z} = useEditableProp('position', {defaultValue: {
            x: 0,
            y: 0,
            z: 0,
        }})

    const width = useEditableProp('width', {
        defaultValue: 1,
    })

    const height = useEditableProp('height', {
        defaultValue: 1,
    })

    const [ref] = useDraggableMesh({
        translationSnap: 1,
    })

    if (isPlaying) {
        return <Physics x={x} y={y} width={width} height={height}/>
    }

    return (
        <EditableGrabbable>
            <group position={[x, y, z]} ref={ref}>
                <Box scale={[width, height, 1]} position={[0, 0, 0.5]} layers={[31]}>
                    <meshBasicMaterial color="blue" transparent opacity={0.5} />
                </Box>
            </group>
        </EditableGrabbable>
    )
}

Barrier.displayName = 'Physics Barrier'

export default Barrier