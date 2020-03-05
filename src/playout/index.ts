import { load } from '../loading';
import { WebAudioPlayoutSource } from './webaudio';

const AUDIO_CONTEXT = new AudioContext();

// reference api https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement

class Playout {
  filenames: string[];
  buffers: AudioBuffer[];
  sources: WebAudioPlayoutSource[];
  playBackPromise: Promise<unknown>[] | undefined;
  constructor(filenames: string[]) {
    this.filenames = filenames;
    this.buffers = [];
    this.sources = [];
  }
  async load() {
    this.buffers = await Promise.all(
      this.filenames.map(file => load(file, AUDIO_CONTEXT))
    );
    this.sources = this.buffers.map(
      buffer => new WebAudioPlayoutSource(AUDIO_CONTEXT, buffer)
    );
  }

  play(when: number = 0, start: number = 0, duration?: number) {
    this.playBackPromise = this.sources.map(source => source.setUpSource());
    this.sources.forEach(source =>
      source.play(
        when,
        start,
        duration !== undefined ? duration : source.getDuration()
      )
    );

    return this.playBackPromise;
  }

  stop() {
    this.sources.forEach(source => source.stop());
  }
}

export { Playout };
