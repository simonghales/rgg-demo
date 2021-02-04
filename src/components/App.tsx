import React from 'react';
import { Editor } from 'rgg-editor';
import Game from '../game/Game';
import { GlobalStyle } from '../ui/global';

function App() {
  return (
      <>
          <GlobalStyle/>
          <Editor>
              <Game/>
          </Editor>
      </>
  );
}

export default App;
