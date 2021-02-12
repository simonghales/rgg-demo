import React, {Suspense, useEffect, useState} from "react"
import {useGLTF} from "@react-three/drei/core/useGLTF";
import {SkeletonUtils} from "three/examples/jsm/utils/SkeletonUtils";
import {setMaterials, setShadows} from "../utils/models";
import {EditableGrabbable, useDraggableMesh, useEditableProp} from "rgg-editor";
import {degToRad} from "../utils/angles";
import {Mesh, MeshBasicMaterial, Object3D} from "three";

const invisibleMaterial = new MeshBasicMaterial()
invisibleMaterial.colorWrite = false
invisibleMaterial.depthWrite = false

const Asset: React.FC<JSX.IntrinsicElements['group'] & {
    path: string,
}> = ({path, ...props}) => {
    const gltf = useGLTF(path)

    const {x, y, z} = useEditableProp('position', {defaultValue: {
            x: 0,
            y: 0,
            z: 0,
        }})

    const rotationX = useEditableProp('rotation-x', {
        defaultValue: 0,
        config: {
            max: 360,
            min: 0,
            step: 0.01,
        }
    })

    const rotationY = useEditableProp('rotation-y', {
        defaultValue: 0,
        config: {
            max: 360,
            min: 0,
            step: 0.01,
        }
    })

    const rotationZ = useEditableProp('rotation-z', {
        defaultValue: 0,
        config: {
            max: 360,
            min: 0,
            step: 0.01,
        }
    })

    const visible = useEditableProp('visible', {
        defaultValue: true,
    })

    const [ref] = useDraggableMesh({
        translationSnap: 1,
    })

    const [cloned]: any = useState(() => {
        const clonedScene = SkeletonUtils.clone(gltf.scene)
        setMaterials(clonedScene, {})
        setShadows(clonedScene)
        return clonedScene
    })

    useEffect(() => {
        if (visible) return
        cloned.traverse((object: Object3D) => {
            if (object.type != 'Mesh') return
            const mesh = object as Mesh
            if (!mesh.material) return
            if (Array.isArray(mesh.material)) {
                mesh.material.forEach((material, index) => {
                    // @ts-ignore
                    mesh.material[index] = invisibleMaterial
                })
            } else {
                mesh.material = invisibleMaterial
            }

        })
    }, [cloned, visible])

    return (
        <EditableGrabbable>
            <group position={[x, y, z]} rotation={[degToRad(rotationX), degToRad(rotationY), degToRad(rotationZ)]} ref={ref}>
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