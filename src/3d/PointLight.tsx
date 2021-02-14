import React from "react"
import {SelectableGroup} from "../temp";

const PointLight: React.FC = () => {
    return (
        <SelectableGroup>
            <pointLight intensity={0.25} castShadow shadowBias={-0.001} />
        </SelectableGroup>
    )
}

PointLight.displayName = 'Point Light'

export default PointLight