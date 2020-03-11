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
    {
      cueIn: 0,
      cueOut: 5,
      gain: 1,
      fadeIn: { duration: 1, shape: 'sCurve' },
      fadeOut: { duration: 1, shape: 'sCurve' },
    },
    {
      cueIn: 0,
      cueOut: 5,
      gain: 1,
      fadeIn: { duration: 1, shape: 'sCurve' },
      fadeOut: { duration: 1, shape: 'sCurve' },
    },
    {
      cueIn: 0,
      cueOut: 5,
      gain: 1,
      fadeIn: { duration: 1, shape: 'sCurve' },
      fadeOut: { duration: 1, shape: 'sCurve' },
    },
    {
      cueIn: 0,
      cueOut: 5,
      gain: 1,
      fadeIn: { duration: 1, shape: 'sCurve' },
      fadeOut: { duration: 1, shape: 'sCurve' },
    },
  ]
);
const loading = playout.load();
playout.setMasterGain(0.1);

let playBack: Promise<unknown>[];

async function play() {
  try {
    await loading;
    if (playBack) {
      await playBack;
      console.log('waited');
    }
    playBack = await playout.play(0);
  } catch (e) {
    console.log(e);
  }
}

async function stop() {
  await playout.stop();
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
