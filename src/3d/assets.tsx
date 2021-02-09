import React from "react"
import Asset from "./Asset";

export const FloorTile: React.FC = () => {
    return <Asset path="/models/spaceship/FloorTile_Basic.glb" position={[0, 0, -0.1]}/>
}

FloorTile.displayName = 'Floor Tile'

export const Wall: React.FC = () => {
    return <Asset path="/models/spaceship/Wall_1.glb" position={[0, 0, -0.1]}/>
}

Wall.displayName = 'Wall'

export const Column: React.FC = () => {
    return <Asset path="/models/spaceship/Column_1.glb" position={[0, 0, -0.1]}/>
}

Column.displayName = 'Column'