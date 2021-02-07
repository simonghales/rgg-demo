import {BodyApi, useFixedUpdate} from "react-three-game-engine";
import {MutableRefObject, useCallback, useRef} from "react";
import {Object3D} from "three";
import {Vec2} from "planck-js";
import {lerpRadians, vectorToAngle} from "../../../utils/angles";
import {useFrame} from "react-three-fiber";
import {inputsRawState} from "../inputs/state";
import { playerStateProxy } from "./playerState";
import {useEditableProp} from "rgg-editor";

const velocity = Vec2(0, 0)
const v2 = Vec2(0, 0)

export const useController = (api: BodyApi, ref: MutableRefObject<Object3D>, speed: number) => {

    const localRef = useRef({
        angle: 0,
    })

    const getMoveVelocity = useCallback((): [number, number] => {
        let xVel = 0
        let yVel = 0

        xVel = inputsRawState.horizontal
        yVel = inputsRawState.vertical

        return [xVel, yVel]
    }, [])

    const onFrame = useCallback((state: any, delta: number) => {

        if (!ref.current) return

        const [xVel, yVel] = getMoveVelocity()

        const moving = xVel !== 0 || yVel !== 0

        let newAngle = localRef.current.angle

        if (moving) {
            const angle = vectorToAngle(xVel, yVel * -1)
            localRef.current.angle = angle
            newAngle = angle
        }

        // ref.current.position.x += xVel * 5 * delta
        // ref.current.position.y += yVel * 5 * delta

        ref.current.rotation.z = lerpRadians(ref.current.rotation.z, newAngle, delta * 10)

        playerStateProxy.moving = moving

    }, [api, ref, localRef, getMoveVelocity])

    const onFixedUpdate = useCallback((delta: number) => {

        const [xVel, yVel] = getMoveVelocity()

        velocity.set(xVel * speed * 150 * delta, yVel * speed * 150 * delta)
        api.applyLinearImpulse(velocity, v2)

    }, [api, getMoveVelocity, speed])

    useFrame(onFrame)
    useFixedUpdate(onFixedUpdate)

}