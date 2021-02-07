import { Plane } from "@react-three/drei"
import React from "react"

const floorColor = '#303030'

const Floor: React.FC = () => {
    return (
        <Plane args={[100, 100]} position={[0, 0, -0.1]}>
            <meshStandardMaterial color={floorColor} />
        </Plane>
    )
}

export default Floor