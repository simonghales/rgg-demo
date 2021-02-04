import React, {useCallback, useEffect, useRef} from "react"
import {Object3D, PerspectiveCamera as OriginalPerspectiveCamera} from "three"
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

const Camera: React.FC = () => {


    const groupRef = useRef(null as unknown as Object3D)
    const cameraRef = useRef<OriginalPerspectiveCamera>(null as unknown as OriginalPerspectiveCamera)
    const props = useGrabbableMesh(cameraRef, CameraHelper)
    const [ref] = useDraggableMesh()
    const setDefaultCamera = useSetDefaultCamera()
    const isEditMode = useIsEditMode()

    const x = useEditableProp('x', {
        defaultValue: 0,
    })
    const y = useEditableProp('y', {
        defaultValue: -20,
    })
    const z = useEditableProp('z', {
        defaultValue: 20,
    })
    const fov = useEditableProp('fov', {
        defaultValue: 30,
    })
    const followUid = useEditableProp('followUid', {
        defaultValue: 'player',
    })

    const followMesh = useStoredMesh(followUid)

    useEffect(() => {
        cameraRef.current.up.set(0,0,1)
        cameraRef.current.lookAt(0, 0, 1.5)
        setMainCamera(cameraRef.current)
    }, [])

    useEffect(() => {
        cameraRef.current.fov = fov
        cameraRef.current.updateProjectionMatrix()
    }, [fov])

    const onFrame = useCallback(() => {
        if (followMesh) {
            cameraRef.current.lookAt(followMesh.position.x, followMesh.position.y, followMesh.position.z + 1.5)
            groupRef.current.position.x = followMesh.position.x
            groupRef.current.position.y = followMesh.position.y
            groupRef.current.position.z = followMesh.position.z
        }
    }, [followMesh])

    useFrame(onFrame)

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

const Wrapper: React.FC = () => {
    return (
        <Editable id="camera">
            <Camera/>
        </Editable>
    )
}

export default Wrapper