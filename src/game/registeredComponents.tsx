import React from "react";
import {registerComponent} from "rgg-editor";
import BambooChunk from "./scenery/BambooChunk";

registerComponent('bambooChunk', 'Bamboo Chunk', () => <BambooChunk/>)