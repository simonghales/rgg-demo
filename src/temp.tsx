import {EditableGrabbable, useDraggableMesh, useEditableProp} from "rgg-editor";
import React from "react";

export const useDefaultTransformControls = (): {
    position: [number, number, number],
    rotation: [number, number, number],
    scale: [number, number, number],
} => {

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

    const {x: scaleX, y: scaleY, z: scaleZ} = useEditableProp('scale', {defaultValue: {
            x: 1,
            y: 1,
            z: 1,
        }})

    return {
        position: [
            x,
            y,
            z,
        ],
        rotation: [
            rotationX,
            rotationY,
            rotationZ,
        ],
        scale: [
            scaleX,
            scaleY,
            scaleZ,
        ]
    }

}

export const SelectableGroup: React.FC = ({children}) => {

    const {
        position,
        rotation,
        scale,
    } = useDefaultTransformControls()

    const [ref] = useDraggableMesh()

    return (
        <EditableGrabbable>
            <group position={position} rotation={rotation} scale={scale} ref={ref}>
                {children}
            </group>
        </EditableGrabbable>
    )
}