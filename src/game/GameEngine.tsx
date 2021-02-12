import React, { Suspense } from "react"
import { Canvas } from "react-three-fiber"
import { Engine, InstancedMesh, InstancesProvider } from "react-three-game-engine"
import { EditCanvas } from "rgg-editor"

// @ts-ignore
import PhysicsWorker from '../worker/physics.worker';

const physicsWorker = new PhysicsWorker()

const GameEngine: React.FC = ({children}) => {
    return (
        <Canvas shadowMap>
            <Engine physicsWorker={physicsWorker}>
                <InstancesProvider>
                    <EditCanvas>
                        <Suspense fallback={null}>
                            <InstancedMesh maxInstances={1000} meshKey="bamboo" gltfPath="/models/Bamboo_4.glb" meshProps={{castShadow: true, receiveShadow: true}}/>
                        </Suspense>
                        {children}
                    </EditCanvas>
                </InstancesProvider>
            </Engine>
        </Canvas>
    )
}

export default GameEngine