import { Sphere } from "@react-three/drei"
import React, {useEffect, useRef} from "react"
import {EditableGrabbable, useDraggableMesh, useEditableProp, useIsEditMode} from "rgg-editor";
import Ninja from "../../../3d/Ninja/Ninja";
import {useController} from "./useController";
import {BodyType, createCircleFixture, useBody, useStoreMesh} from "react-three-game-engine";
import {Object3D} from "three";
import {Vec2} from "planck-js";
import {useProxy} from "valtio";
import {playerStateProxy} from "./playerState";

const vec2 = new Vec2(0, 0)

const EditingWrapper: React.FC<{
    x: number,
    y: number,
    z: number,
}> = ({x, y, z, children}) => {

    const [draggableRef] = useDraggableMesh()

    useEffect(() => {
        draggableRef.current?.position.set(x, y, z)
    }, [x, y, z])

    useStoreMesh('player', draggableRef.current as Object3D)

    return (
        <EditableGrabbable>
            <group position={[x, y, z]} ref={draggableRef}>
                {children}
            </group>
        </EditableGrabbable>
    )
}

const PlayingWrapper: React.FC<{
    x: number,
    y: number,
    speed: number,
}> = ({x, y, speed, children}) => {

    const ref = useRef(new Object3D())

    const [,api] = useBody(() => ({
        type: BodyType.dynamic,
        position: Vec2(x, y),
        linearDamping: 15,
        fixtures: [
            createCircleFixture({radius: 0.55, fixtureOptions: {
                    density: 20,
                }})
        ],
    }), {
        fwdRef: ref,
        uuid: 'player',
    })

    useController(api, ref, speed)

    useStoreMesh('player', ref.current as Object3D)

    return (
        <group ref={ref}>
            {children}
        </group>
    )

}

const Player: React.FC = () => {

    const x = useEditableProp('x', {defaultValue: 0})
    const y = useEditableProp('y', {defaultValue: 0})
    const z = useEditableProp('z', {defaultValue: 0})
    const speed = useEditableProp('speed', {
        defaultValue: 5
    })

    const isPlaying = !useIsEditMode()
    const [draggableRef] = useDraggableMesh()
    const moving = useProxy(playerStateProxy).moving

    useEffect(() => {
        draggableRef.current?.position.set(x, y, z)
    }, [x, y, z])

    const model = (
        <Ninja rotation={[Math.PI / 2, 0, 0]} moving={moving}/>
    )

    if (isPlaying) {
        return (
            <PlayingWrapper x={x} y={y} speed={speed}>
                {model}
            </PlayingWrapper>
        )
    }


    return (
        <EditingWrapper x={x} y={y} z={z}>
            {model}
        </EditingWrapper>
    )
}

export default Player