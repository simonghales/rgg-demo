import React from "react";
import {registerComponent} from "rgg-editor";
import BambooChunk from "./scenery/BambooChunk";
import {FloorTile, Wall} from "../3d/assets";
import Barrier from "../3d/Barrier";

registerComponent('bambooChunk', 'Bamboo Chunk', () => <BambooChunk/>)
registerComponent('floorTile', 'Floor Tile', () => <FloorTile/>)
registerComponent('wall', 'Wall', () => <Wall/>)
registerComponent('physicsBarrier', 'Physics Barrier', () => <Barrier/>)