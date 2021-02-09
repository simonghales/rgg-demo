import React from "react"
import {useDefaultTransformControls} from "../temp";
import {EditableGrabbable, useDraggableMesh, useEditableProp} from "rgg-editor";
import {Plane} from "@react-three/drei";

const EditablePlane: React.FC = () => {
    const {
        position,
        rotation,
        scale,
    } = useDefaultTransformControls()

    const color = useEditableProp('color', {
        defaultValue: '#000000',
    })

    const [ref] = useDraggableMesh()

    return (
        <EditableGrabbable>
            <group position={position} rotation={rotation} scale={scale} ref={ref}>
                <Plane>
                    <meshBasicMaterial color={color} />
                </Plane>
            </group>
        </EditableGrabbable>
    )
}

EditablePlane.displayName = 'Plane'

export default EditablePlane