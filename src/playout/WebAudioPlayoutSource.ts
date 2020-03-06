import { FADEIN, FADEOUT, createFadeIn, createFadeOut } from 'fade-maker';

class WebAudioPlayoutSource {
  ac: AudioContext;
  gain: number;
  buffer: AudioBuffer;
  destination: AudioDestinationNode;
  source: AudioBufferSourceNode | undefined;
  fadeGain: GainNode | undefined;
  // used for track volume slider
  volumeGain: GainNode | undefined;
  // used for solo/mute
  shouldPlayGain: GainNode | undefined;
  masterGain: GainNode | undefined;
  constructor(ac: AudioContext, buffer: AudioBuffer) {
    this.ac = ac;
    this.gain = 1;
    this.buffer = buffer;
    this.destination = this.ac.destination;
  }

  applyFade(
    type: string,
    start: number,
    duration: number,
    shape = 'logarithmic'
  ) {
    if (!this.fadeGain) {
      throw new Error('Source not setup');
    }
    if (type === FADEIN) {
      createFadeIn(this.fadeGain.gain, shape, start, duration);
    } else if (type === FADEOUT) {
      createFadeOut(this.fadeGain.gain, shape, start, duration);
    } else {
      throw new Error('Unsupported fade type');
    }
  }

  applyFadeIn(start: number, duration: number, shape = 'logarithmic') {
    this.applyFade(FADEIN, start, duration, shape);
  }

  applyFadeOut(start: number, duration: number, shape = 'logarithmic') {
    this.applyFade(FADEOUT, start, duration, shape);
  }

  isPlaying() {
    return this.source !== undefined;
  }

  getDuration() {
    return this.buffer.duration;
  }

  setAudioContext(audioContext: AudioContext) {
    this.ac = audioContext;
    this.destination = this.ac.destination;
  }

  setUpSource() {
    const source = this.ac.createBufferSource();
    source.buffer = this.buffer;

    const fadeGain = this.ac.createGain();
    const volumeGain = this.ac.createGain();
    const shouldPlayGain = this.ac.createGain();
    const masterGain = this.ac.createGain();

    this.source = source;
    this.fadeGain = fadeGain;
    this.volumeGain = volumeGain;
    this.shouldPlayGain = shouldPlayGain;
    this.masterGain = masterGain;

    // TODO expose this to allow for custom node graphs
    this.source.connect(this.fadeGain);
    this.fadeGain.connect(this.volumeGain);
    this.volumeGain.connect(this.shouldPlayGain);
    this.shouldPlayGain.connect(this.masterGain);
    this.masterGain.connect(this.destination);

    const sourcePromise = new Promise(resolve => {
      // keep track of the AudioBufferSourceNode state.
      source.onended = () => {
        source.disconnect();
        fadeGain.disconnect();
        volumeGain.disconnect();
        shouldPlayGain.disconnect();
        masterGain.disconnect();

        this.source = undefined;
        this.fadeGain = undefined;
        this.volumeGain = undefined;
        this.shouldPlayGain = undefined;
        this.masterGain = undefined;

        resolve();
      };
    });

    return sourcePromise;
  }

  setVolumeGainLevel(level: number) {
    if (this.volumeGain) {
      this.volumeGain.gain.value = level;
    }
  }

  setShouldPlay(bool: boolean) {
    if (this.shouldPlayGain) {
      this.shouldPlayGain.gain.value = bool ? 1 : 0;
    }
  }

  setMasterGainLevel(level: number) {
    if (this.masterGain) {
      this.masterGain.gain.value = level;
    }
  }

  /*
    source.start is picky when passing the end time.
    If rounding error causes a number to make the source think
    it is playing slightly more samples than it has it won't play at all.
    Unfortunately it doesn't seem to work if you just give it a start time.
  */
  play(when: number, start: number, duration: number) {
    if (this.source) {
      this.source.start(when, start, duration);
    }
  }

  stop(when = 0) {
    if (this.source) {
      this.source.stop(when);
    }
  }
}

export { WebAudioPlayoutSource };
