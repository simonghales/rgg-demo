import React from "react"
import GameEngine from "./GameEngine"
import GameContents from "./GameContents";
import {loadDemoData} from "./demo";

loadDemoData()

const Game: React.FC = () => {
    return (
        <GameEngine>
            <GameContents/>
        </GameEngine>
    )
}

export default Game