import React from "react";
import {registerComponent} from "rgg-editor";
import BambooChunk from "./scenery/BambooChunk";
import {Column, FloorTile, Wall} from "../3d/assets";
import Barrier from "../3d/Barrier";

registerComponent('bambooChunk', 'Bamboo Chunk', () => <BambooChunk/>)
registerComponent('floorTile', 'Floor Tile', () => <FloorTile/>, {
    transformPlace: (position: [number, number, number]) => {
        return position.map(pos => Math.round(pos)) as [number, number, number]
    }
})
registerComponent('wall', 'Wall', () => <Wall/>, {
    transformPlace: (position: [number, number, number]) => {
        return position.map(pos => Math.round(pos)) as [number, number, number]
    }
})
registerComponent('column', 'Column', () => <Column/>, {
    transformPlace: (position: [number, number, number]) => {
        return position.map(pos => Math.round(pos)) as [number, number, number]
    }
})
registerComponent('physicsBarrier', 'Physics Barrier', () => <Barrier/>)