import { Plane } from "@react-three/drei"
import React from "react"
import {useDefaultTransformControls} from "../temp";
import {EditableGrabbable, useDraggableMesh, useEditableProp} from "rgg-editor";

const Ceiling: React.FC = () => {

    const {
        position,
        rotation,
    } = useDefaultTransformControls()

    const width = useEditableProp('width', {
        defaultValue: 1,
    })

    const height = useEditableProp('height', {
        defaultValue: 1,
    })

    const [ref] = useDraggableMesh({
        translationSnap: 1,
    })

    return (
        <EditableGrabbable>
            <group position={position} rotation={rotation} ref={ref}>
                <Plane args={[width, height]}>
                    <meshBasicMaterial color="black" />
                </Plane>
            </group>
        </EditableGrabbable>
    )
}

export default Ceiling