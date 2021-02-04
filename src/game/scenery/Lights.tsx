import React from "react"
import {useEditableProp} from "rgg-editor";

const Lights: React.FC = () => {

    const intensity = useEditableProp('intensity', {
        defaultValue: 0.8,
    })

    return (
        <>
            <ambientLight intensity={intensity} />
        </>
    )
}

export default Lights