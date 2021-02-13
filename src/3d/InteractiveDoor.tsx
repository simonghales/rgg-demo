import { Box } from "@react-three/drei"
import React, { Suspense } from "react"
import {EditableGrabbable, useDraggableMesh, useIsEditMode} from "rgg-editor";
import {SelectableGroup, useDefaultTransformControls} from "../temp";
import {BodyType, createBoxFixture, useBody} from "react-three-game-engine";
import {Vec2} from "planck-js";
import {useIsDoorOpen} from "../game/gameplay/state";
import DoubleDoor from "./DoubleDoor";

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
    } = useDefaultTransformControls()

    const isPlaying = !useIsEditMode()

    const doorIsOpen = useIsDoorOpen('door')

    return (
        <>
            <SelectableGroup>
                <Suspense fallback={null}>
                    <DoubleDoor isOpen={doorIsOpen} rotation={[Math.PI / 2, 0, 0]}/>
                </Suspense>
            </SelectableGroup>
            {
                (isPlaying && !doorIsOpen) && <Physics x={position[0]} y={position[1]} width={1} height={3}/>
            }
        </>
    )
}

InteractiveDoor.displayName = 'Interactive Door'

export default InteractiveDoor