import { Box } from "@react-three/drei"
import React, {useRef} from "react"
import {SelectableGroup, useDefaultTransformControls} from "../temp"
import {useEditableProp, useIsEditMode} from "rgg-editor";
import {BodyType, createBoxFixture, useBody, useStoreMesh} from "react-three-game-engine";
import {Vec2} from "planck-js";
import {Object3D} from "three";

const Physics: React.FC<{
    id: string,
    collisionType: string,
    customData: string,
    x: number,
    y: number,
    width: number,
    height: number,
}> = ({x, y, width, height, id, collisionType, customData}) => {

    useBody(() => ({
        type: BodyType.static,
        position: Vec2(x, y),
        fixtures: [createBoxFixture({
            width,
            height,
            fixtureOptions: {
                isSensor: true,
                userData: {
                    id,
                    groupType: collisionType,
                    customData,
                }
            }
        })],
    }))

    return null
}

const Collider: React.FC = () => {

    const isPlaying = !useIsEditMode()

    const id = useEditableProp('id', {
        defaultValue: '',
    })

    const collisionType = useEditableProp('collisionType', {
        defaultValue: '',
    })

    const customData = useEditableProp('customData', {
        defaultValue: '',
    })

    const {
        position,
        scale,
    } = useDefaultTransformControls()

    const ref = useRef<Object3D>(new Object3D())

    useStoreMesh(id ?? ref.current.uuid, ref.current)

    return (
        <>
            <SelectableGroup>
                <Box ref={ref} scale={scale} layers={[31]} visible={!isPlaying}>
                    <meshBasicMaterial color="orange" transparent opacity={0.33} />
                </Box>
            </SelectableGroup>
            {isPlaying && <Physics id={id} collisionType={collisionType} customData={customData} x={position[0]} y={position[1]} width={scale[0]} height={scale[1]}/>}
        </>
    )
}

export default Collider