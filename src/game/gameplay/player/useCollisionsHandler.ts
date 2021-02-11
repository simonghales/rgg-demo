import {useCallback} from "react";
import {CollisionGroupType} from "../collisions";
import {useCollisionEvents} from "react-three-game-engine";
import {setDoorOpen} from "../state";

type CollisionData = {
    uuid: string,
    fixtureIndex: number,
    groupType: number,
    [key: string]: any,
}

export const useCollisionsHandler = () => {

    const onCollideStart = useCallback(({uuid, groupType, ...data}: CollisionData) => {
        switch (groupType) {
            case CollisionGroupType.TERMINAL:
                setDoorOpen('door')
                break;
        }
    }, [])

    const onCollideEnd = useCallback(({uuid, groupType, ...data}: CollisionData) => {
        switch (groupType) {
            case CollisionGroupType.TERMINAL:
                break;
        }
    }, [])

    useCollisionEvents('player', onCollideStart, onCollideEnd)

}