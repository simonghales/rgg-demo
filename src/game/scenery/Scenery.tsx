import React from "react"
import { Editable } from "rgg-editor"
import Floor from "./Floor"
import Lights from "./Lights"

const Scenery: React.FC = () => {
    return (
        <>
            <Editable id="lights">
                <Lights/>
            </Editable>
            <Floor/>
        </>
    )
}

export default Scenery