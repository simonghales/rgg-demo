import React, {MutableRefObject, useCallback, useEffect, useRef} from "react"
import {Object3D, PerspectiveCamera as OriginalPerspectiveCamera, Vector3} from "three"
import {PerspectiveCamera} from "@react-three/drei";
import {
    Editable,
    setMainCamera,
    useEditableProp,
    useGrabbableMesh,
    useIsEditMode,
    useSetDefaultCamera,
    useDraggableMesh
} from "rgg-editor";
import {CameraHelper} from "three";
import {useFrame} from "react-three-fiber";
import {useStoredMesh} from "react-three-game-engine";
import {lerp} from "../../utils/numbers";
import {proxy, useProxy} from "valtio";
import {useSpring} from "@react-spring/three";

export const cameraProxyState = proxy<{
    anchorTarget: Object3D | null,
}>({
    anchorTarget: null,
})

const anchorPosition = new Vector3()

const useCameraFollow = (groupRef: MutableRefObject<Object3D>, cameraRef: MutableRefObject<Object3D>) => {

    const followUid = useEditableProp('followUid', {
        defaultValue: 'player',
    })

    const anchorTarget = useProxy(cameraProxyState).anchorTarget

    const followMesh = useStoredMesh(followUid)

    const {anchorWeight} = useSpring({
        anchorWeight: !!anchorTarget ? 1 : 0,
        config: {
            friction: 48,
        }
    })

    const onFrame = useCallback((state: any, delta: number) => {
        if (followMesh) {
            let amount = delta * 16
            amount = amount > 1 ? 1 : amount

            if (anchorTarget) {
                anchorTarget.getWorldPosition(anchorPosition)
            }

            const anchorX = anchorPosition.x
            const anchorY = anchorPosition.y
            const anchorZ = anchorPosition.z

            const followX = followMesh.position.x
            const followY = followMesh.position.y
            const followZ = followMesh.position.z

            const anchorLerpAmount = anchorWeight.get()

            const targetX = lerp(followX, anchorX, anchorLerpAmount)
            const targetY = lerp(followY, anchorY, anchorLerpAmount)
            const targetZ = lerp(followZ, anchorZ, anchorLerpAmount)

            const finalX = lerp(groupRef.current.position.x, targetX, amount)
            const finalY = lerp(groupRef.current.position.y, targetY, amount)
            const finalZ = lerp(groupRef.current.position.z, targetZ, amount)

            groupRef.current.position.x = finalX
            groupRef.current.position.y = finalY
            groupRef.current.position.z = finalZ
            cameraRef.current.lookAt(finalX, finalY, finalZ + 1.5)
        }
    }, [followMesh, anchorTarget])

    useFrame(onFrame)

}

const Camera: React.FC = () => {


    const groupRef = useRef(null as unknown as Object3D)
    const cameraRef = useRef<OriginalPerspectiveCamera>(null as unknown as OriginalPerspectiveCamera)
    const props = useGrabbableMesh(cameraRef, CameraHelper)
    const [ref] = useDraggableMesh()
    const setDefaultCamera = useSetDefaultCamera()
    const isEditMode = useIsEditMode()
    useCameraFollow(groupRef, cameraRef)

    const {x, y, z} = useEditableProp('position', {defaultValue: {
            x: 20,
            y: -20,
            z: 20,
        }})

    const fov = useEditableProp('fov', {
        defaultValue: 30,
    })

    useEffect(() => {
        cameraRef.current.up.set(0,0,1)
        cameraRef.current.lookAt(groupRef.current.position.x, groupRef.current.position.y, groupRef.current.position.z + 1.5)
        setMainCamera(cameraRef.current)
    }, [])

    useEffect(() => {
        cameraRef.current.fov = fov
        cameraRef.current.updateProjectionMatrix()
    }, [fov])

    useEffect(() => {
        if (isEditMode) return
        setDefaultCamera(cameraRef.current)
    }, [isEditMode])

    return (
        <group ref={groupRef}>
            <group position={[x, y, z]} {...props} ref={ref}>
                <PerspectiveCamera ref={cameraRef} />
            </group>
        </group>
    )
}

Camera.displayName = 'Camera'

const Wrapper: React.FC = () => {
    return (
        <Editable id="camera">
            <Camera/>
        </Editable>
    )
}

export default Wrapper