import {useCallback} from "react";
import {CollisionGroupType} from "../collisions";
import {useCollisionEvents} from "react-three-game-engine";
import {setDoorOpen, setInsideRoom} from "../state";

type CollisionData = {
    uuid: string,
    fixtureIndex: number,
    groupType: CollisionGroupType,
    [key: string]: any,
}

export const useCollisionsHandler = () => {

    const onCollideStart = useCallback(({uuid, groupType, ...data}: CollisionData) => {
        switch (groupType) {
            case CollisionGroupType.TERMINAL:
                setDoorOpen('door', (open: boolean) => !open)
                break;
            case CollisionGroupType.ROOM:
                setInsideRoom(data.id as string, true, uuid)
                break;
        }
    }, [])

    const onCollideEnd = useCallback(({uuid, groupType, ...data}: CollisionData) => {
        switch (groupType) {
            case CollisionGroupType.TERMINAL:
                break;
            case CollisionGroupType.ROOM:
                setInsideRoom(data.id as string, false)
                break;
        }
    }, [])

    useCollisionEvents('player', onCollideStart, onCollideEnd)

}