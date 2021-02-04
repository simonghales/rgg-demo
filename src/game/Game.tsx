import React from "react"
import GameEngine from "./GameEngine"
import GameContents from "./GameContents";

const Game: React.FC = () => {
    return (
        <GameEngine>
            <GameContents/>
        </GameEngine>
    )
}

export default Game