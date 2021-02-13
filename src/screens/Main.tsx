import React, {useEffect, useState} from "react"
import {Editor} from "rgg-editor";
import Game from "../game/Game";
import styled from "styled-components";

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const Main: React.FC<{
    playOnly?: boolean,
}> = ({
                      playOnly = false,
                  }) => {

    return (
        <StyledWrapper>
            <Editor gameOnly={playOnly}>
                <Game/>
            </Editor>
        </StyledWrapper>
    )
}

export default Main