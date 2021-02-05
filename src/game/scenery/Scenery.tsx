import React from "react"
import { Editable } from "rgg-editor"
import Floor from "./Floor"
import Lights from "./Lights"
import BambooChunk from "./BambooChunk";

const Scenery: React.FC = () => {
    return (
        <>
            <Editable id="lights">
                <Lights/>
            </Editable>
            <Floor/>
            <Editable id="bambooChunk" width={10} height={5} position={{
                x: 0,
                y: 10,
                z: 0,
            }}>
                <BambooChunk/>
            </Editable>
        </>
    )
}

export default Scenery