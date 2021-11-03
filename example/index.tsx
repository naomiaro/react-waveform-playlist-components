import * as React from 'react';
import * as ReactDOM from 'react-dom';

// import { Playout } from '../src/playout';

import { ToneSource } from '../src/playout/ToneSource';

const playout = new ToneSource([
  { id: 'vocals', src: '/media/audio/Vocals30.mp3' },
  { id: 'guitar', src: '/media/audio/Guitar30.mp3' },
  { id: 'piano', src: '/media/audio/PianoSynth30.mp3' },
  { id: 'drums', src: '/media/audio/BassDrums30.mp3' },
]);

// const playout1 = new Playout(
//   [
//     '/media/audio/Vocals30.mp3',
//     '/media/audio/Guitar30.mp3',
//     '/media/audio/PianoSynth30.mp3',
//     '/media/audio/BassDrums30.mp3',
//   ],
//   [
//     {
//       start: 0,
//       cueIn: 7,
//       cueOut: 15,
//       gain: 1,
//       fadeIn: { duration: 2, shape: 'linear' },
//       fadeOut: { duration: 1, shape: 'linear' },
//     },
//     {
//       start: 0,
//       cueIn: 7,
//       cueOut: 15,
//       gain: 1,
//       fadeIn: { duration: 2, shape: 'linear' },
//       fadeOut: { duration: 1, shape: 'linear' },
//     },
//     {
//       start: 0,
//       cueIn: 7,
//       cueOut: 15,
//       gain: 1,
//       fadeIn: { duration: 2, shape: 'linear' },
//       fadeOut: { duration: 1, shape: 'linear' },
//     },
//     {
//       start: 0,
//       cueIn: 7,
//       cueOut: 15,
//       gain: 1,
//       fadeIn: { duration: 2, shape: 'linear' },
//       fadeOut: { duration: 1, shape: 'linear' },
//     },
//   ]
// );
const loading = playout.load();

async function play() {
  try {
    await loading;
    playout.start(0);
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
