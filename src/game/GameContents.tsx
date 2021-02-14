import React from "react"
import {Editable, useIsEditMode} from "rgg-editor"
import "./registeredComponents"
import Player from "./gameplay/player/Player"
import Scenery from "./scenery/Scenery"
import Camera from "./gameplay/Camera";
import InputsHandler from "./gameplay/inputs/InputsHandler";
import StateHandler from "./gameplay/StateHandler"

const GameContents: React.FC = () => {
    const isPlayMode = !useIsEditMode()
    return (
        <>
            <StateHandler/>
            <Camera/>
            <Scenery/>
            <Editable id="player">
                <Player/>
            </Editable>
            {
                isPlayMode && (
                    <>
                        <InputsHandler/>
                    </>
                )
            }
        </>
    )
}

export default GameContents