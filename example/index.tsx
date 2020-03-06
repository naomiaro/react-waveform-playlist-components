import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Playout } from '../src/playout';

const playout = new Playout([
  { src: '/media/audio/Vocals30.mp3', cuein: 6, cueout: 15 },
  { src: '/media/audio/Guitar30.mp3', cuein: 6, cueout: 15 },
  { src: '/media/audio/PianoSynth30.mp3', cuein: 6, cueout: 15 },
  { src: '/media/audio/BassDrums30.mp3', cuein: 6, cueout: 15 },
]);
const loading = playout.load();
let playBack: Promise<unknown>[];

async function play() {
  try {
    await loading;
    playBack = playout.play();
  } catch (e) {
    console.log(e);
  }
}

function stop() {
  playout.stop();
}

const App = () => {
  return (
    <div>
      <button onClick={play}>Play</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
