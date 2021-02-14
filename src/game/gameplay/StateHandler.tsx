import React from "react"
import ActiveRoom from "./ActiveRoom";
import {useActiveRoom} from "./state";

const StateHandler: React.FC = () => {

    const activeRoom = useActiveRoom()

    return (
        <>
            {
                activeRoom && <ActiveRoom id={activeRoom}/>
            }
        </>
    )
}

export default StateHandler