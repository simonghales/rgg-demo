import React from "react"
import {useEditableProp, useIsEditMode} from "rgg-editor";

const Lights: React.FC = () => {

    const intensity = useEditableProp('intensity', {
        defaultValue: 0.05,
    })

    const isEditMode = useIsEditMode()

    if (!isEditMode) return null

    return (
        <>
            <ambientLight intensity={intensity} />
        </>
    )
}

Lights.displayName = 'Lights'

export default Lights