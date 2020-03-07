import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Playout } from '../src/playout';

const playout = new Playout(
  [
    '/media/audio/Vocals30.mp3',
    '/media/audio/Guitar30.mp3',
    '/media/audio/PianoSynth30.mp3',
    '/media/audio/BassDrums30.mp3',
  ],
  [
    { cuein: 0, cueout: 15, gain: 1 },
    { cuein: 0, cueout: 15, gain: 1 },
    { cuein: 0, cueout: 15, gain: 1 },
    { cuein: 0, cueout: 15, gain: 1 },
  ]
);
const loading = playout.load();
playout.setMasterGain(0.1);

let playBack: Promise<unknown>[];

async function play() {
  try {
    await loading;
    playBack = playout.play(6);
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
