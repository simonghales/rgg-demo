import React from "react"
import Asset from "./Asset";

export const FloorTile: React.FC = () => {
    return <Asset path="/models/spaceship/FloorTile_Basic.glb" position={[0, 0, -0.1]}/>
}

export const Wall: React.FC = () => {
    return <Asset path="/models/spaceship/Wall_1.glb" position={[0, 0, -0.1]}/>
}