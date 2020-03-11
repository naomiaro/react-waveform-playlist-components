import { FADEIN, FADEOUT, createFadeIn, createFadeOut } from 'fade-maker';

class WebAudioPlayoutSource {
  ac: AudioContext;
  cueIn: number;
  cueOut: number;
  offset: number;
  gain: number;
  buffer: AudioBuffer;
  destination: AudioDestinationNode;
  source: AudioBufferSourceNode | undefined;
  fadeGain: GainNode | undefined;
  // used for track volume slider
  volumeGain: GainNode | undefined;
  masterGain: GainNode | undefined;
  constructor(ac: AudioContext, buffer: AudioBuffer) {
    this.ac = ac;
    this.gain = 1;
    this.buffer = buffer;
    this.destination = this.ac.destination;
    this.cueIn = 0;
    this.cueOut = buffer.duration;
    this.offset = 0;
  }

  get duration() {
    return this.cueOut - this.cueIn + this.offset;
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

  setAudioContext(audioContext: AudioContext) {
    this.ac = audioContext;
    this.destination = this.ac.destination;
  }

  setUpSource(): Promise<void> {
    const source = this.ac.createBufferSource();
    source.buffer = this.buffer;

    const fadeGain = this.ac.createGain();
    const volumeGain = this.ac.createGain();
    const masterGain = this.ac.createGain();

    this.source = source;
    this.fadeGain = fadeGain;
    this.volumeGain = volumeGain;
    this.masterGain = masterGain;

    // TODO expose this to allow for custom node graphs
    this.source.connect(this.fadeGain);
    this.fadeGain.connect(this.volumeGain);
    this.volumeGain.connect(this.masterGain);
    this.masterGain.connect(this.destination);

    const sourcePromise = new Promise<void>(resolve => {
      // keep track of the AudioBufferSourceNode state.
      source.onended = () => {
        // gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
        console.log('ended');
        this.source && source.disconnect();
        this.fadeGain && fadeGain.disconnect();
        this.volumeGain && volumeGain.disconnect();
        this.masterGain && masterGain.disconnect();

        this.source = undefined;
        this.fadeGain = undefined;
        this.volumeGain = undefined;
        this.masterGain = undefined;

        resolve();
      };
    });

    return sourcePromise;
  }

  setCues(cueIn?: number, cueOut?: number, offset = 0) {
    this.cueIn = cueIn || 0;
    this.cueOut = cueOut || this.buffer.duration;
    this.offset = offset;
  }

  setVolumeGainLevel(level: number) {
    if (this.volumeGain) {
      this.volumeGain.gain.value = level;
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
