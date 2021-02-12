import React from "react";
import {registerComponent} from "rgg-editor";
import BambooChunk from "./scenery/BambooChunk";
import {Column, DoubleDoor, FloorTile, Wall} from "../3d/assets";
import Barrier from "../3d/Barrier";
import Ceiling from "../3d/Ceiling";
import EditablePlane from "../3d/EditablePlane";
import InteractiveDoor from "../3d/InteractiveDoor";
import Terminal from "../3d/Terminal";
import PointLight from "../3d/PointLight";

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

registerComponent('doubleDoor', 'Double Door', () => <DoubleDoor/>, {
    transformPlace: (position: [number, number, number]) => {
        return position.map(pos => Math.round(pos)) as [number, number, number]
    }
})

registerComponent('physicsBarrier', 'Physics Barrier', () => <Barrier/>)
registerComponent('ceiling', 'Ceiling', () => <Ceiling/>)
registerComponent('plane', 'Plane', () => <EditablePlane/>)
registerComponent('interactiveDoor', 'Interactive Door', () => <InteractiveDoor/>)
registerComponent('terminal', 'Terminal', () => <Terminal/>)
registerComponent('pointLight', 'Point Light', () => <PointLight/>)