import React from "react"
import Bamboo from "./Bamboo";
import {EditableGrabbable, useDraggableMesh, useEditableProp, useIsEditMode} from "rgg-editor";
import { Box } from "@react-three/drei";

const BambooChunk: React.FC = () => {

    const {x, y, z} = useEditableProp('position', {defaultValue: {
            x: 0,
            y: 0,
            z: 0,
        }})

    const width = useEditableProp('width', {defaultValue: 2})
    const height = useEditableProp('height', {defaultValue: 2})
    const isEditMode = useIsEditMode()
    const [draggableRef] = useDraggableMesh()

    return (
        <>
            {
                isEditMode && (
                    <EditableGrabbable>
                        <Box args={[width, height, 1]} position={[x, y, z]} ref={draggableRef}>
                            <meshBasicMaterial color={"white"} transparent opacity={0.25} />
                        </Box>
                    </EditableGrabbable>
                )
            }
            <Bamboo width={width} height={height} xPos={x} yPos={y}/>
        </>
    )
}

BambooChunk.displayName = 'Bamboo Chunk'

export default BambooChunk