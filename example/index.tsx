import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Playout } from '../src/playout';

async function test1() {
  const playout = new Playout([
    '/media/audio/Vocals30.mp3',
    '/media/audio/Guitar30.mp3',
    '/media/audio/PianoSynth30.mp3',
    '/media/audio/BassDrums30.mp3',
  ]);
  try {
    await playout.load();
    playout.play();

    setTimeout(playout.stop.bind(playout), 5000);
  } catch (e) {
    console.log(e);
  }
}

const App = () => {
  return (
    <div>
      <button onClick={test1}>Play</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
