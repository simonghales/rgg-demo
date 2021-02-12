import React from "react"
import {Box} from "@react-three/drei";
import {EditableGrabbable, useDraggableMesh, useIsEditMode} from "rgg-editor";
import {SelectableGroup, useDefaultTransformControls} from "../temp";
import {BodyType, createBoxFixture, useBody} from "react-three-game-engine";
import {Vec2} from "planck-js";
import {CollisionGroupType} from "../game/gameplay/collisions";
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
            fixtureOptions: {
                userData: {
                    groupType: CollisionGroupType.TERMINAL,
                }
            }
        })],
    }))

    return null
}

const Terminal: React.FC = () => {

    const {
        position,
    } = useDefaultTransformControls()

    const isPlaying = !useIsEditMode()

    return (
        <>
            <SelectableGroup>
                <Box args={[1, 1, 2]}>
                    <meshBasicMaterial color="blue" />
                </Box>
            </SelectableGroup>
            {
                (isPlaying) && <Physics x={position[0]} y={position[1]} width={1} height={1}/>
            }
        </>
    )
}

Terminal.displayName = 'Terminal'

export default Terminal