import React, {Suspense, useState} from "react"
import {useGLTF} from "@react-three/drei/core/useGLTF";
import {SkeletonUtils} from "three/examples/jsm/utils/SkeletonUtils";
import {setMaterials, setShadows} from "../utils/models";
import {EditableGrabbable, useDraggableMesh, useEditableProp} from "rgg-editor";

const Asset: React.FC<JSX.IntrinsicElements['group'] & {
    path: string,
}> = ({path, ...props}) => {
    const gltf = useGLTF(path)

    const {x, y, z} = useEditableProp('position', {defaultValue: {
            x: 0,
            y: 0,
            z: 0,
        }})

    const [ref] = useDraggableMesh({
        translationSnap: 1,
    })

    const [cloned]: any = useState(() => {
        const clonedScene = SkeletonUtils.clone(gltf.scene)
        setMaterials(clonedScene, {})
        setShadows(clonedScene)
        return clonedScene
    })

    return (
        <EditableGrabbable>
            <group position={[x, y, z]} ref={ref}>
                <primitive object={cloned} dispose={null} {...props} />
            </group>
        </EditableGrabbable>
    )
}

const Wrapper: React.FC<{
    path: string,
    position?: [number, number, number]
}> = ({path, position}) => {
    return (
        <Suspense fallback={null}>
            <Asset path={path} position={position} rotation={[Math.PI / 2, 0, 0]}/>
        </Suspense>
    )
}

export default Wrapper