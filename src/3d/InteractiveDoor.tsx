import { Box } from "@react-three/drei"
import React from "react"
import {EditableGrabbable, useDraggableMesh, useIsEditMode} from "rgg-editor";
import {useDefaultTransformControls} from "../temp";
import {BodyType, createBoxFixture, useBody} from "react-three-game-engine";
import {Vec2} from "planck-js";
import {useIsDoorOpen} from "../game/gameplay/state";

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

const InteractiveDoor: React.FC = () => {

    const {
        position,
        rotation,
        scale,
    } = useDefaultTransformControls()

    const [ref] = useDraggableMesh()

    const isPlaying = !useIsEditMode()

    const doorIsOpen = useIsDoorOpen('door')

    return (
        <>
            <EditableGrabbable>
                <group position={position} rotation={rotation} scale={scale} ref={ref}>
                    <Box args={[1, 3, 6]}>
                        <meshBasicMaterial color="red" transparent opacity={doorIsOpen ? 0.5 : 1} />
                    </Box>
                </group>
            </EditableGrabbable>
            {
                (isPlaying && !doorIsOpen) && <Physics x={position[0]} y={position[1]} width={1} height={3}/>
            }
        </>
    )
}

InteractiveDoor.displayName = 'Interactive Door'

export default InteractiveDoor