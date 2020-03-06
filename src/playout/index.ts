import { load } from '../loading';
import { WebAudioPlayoutSource } from './WebAudioPlayoutSource';

const AUDIO_CONTEXT = new AudioContext();

type FadeCurve = 'logarithmic' | 'linear' | 'sCurve' | 'exponential';

interface TrackConfig {
  src: string | File;
  // volume level of the track between [0-1]
  gain?: number;
  // whether the track should initially be muted.
  muted?: boolean;
  // whether the track should initially be soloed.
  soloed?: boolean;
  // time in seconds relative to the playlist
  // ex (track will start after 8.5 seconds)
  // DEFAULT 0 - track starts at beginning of playlist
  start?: number;
  // track fade in details
  fadeIn?: {
    shape: FadeCurve;
    // length of fade starting from the beginning of this track, in seconds.
    duration: number;
  };
  // track fade out details
  fadeOut?: {
    shape: FadeCurve;
    //length of fade which reaches the end of this track, in seconds.
    duration: number;
  };
  // where the waveform for this track should begin from
  // ex (Waveform will begin 15 seconds into this track)
  // DEFAULT start at the beginning - 0 seconds
  cuein?: number;
  // where the waveform for this track should end
  // ex (Waveform will end at 30 second into this track)
  // DEFAULT duration of the track
  cueout?: number;
}

// reference api https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement

class Playout {
  tracks: TrackConfig[];
  buffers: AudioBuffer[];
  sources: WebAudioPlayoutSource[];
  playBackPromises: Promise<unknown>[] | undefined;
  constructor(tracks: TrackConfig[]) {
    this.tracks = tracks;
    this.buffers = [];
    this.sources = [];
  }
  async load() {
    this.buffers = await Promise.all(
      this.tracks.map(track => load(track.src, AUDIO_CONTEXT))
    );
    this.sources = this.buffers.map(
      buffer => new WebAudioPlayoutSource(AUDIO_CONTEXT, buffer)
    );
  }

  play(when: number = 0, start: number = 0, duration?: number) {
    this.playBackPromises = this.sources.map((source, i) => {
      const playBackPromise = source.setUpSource();
      const gain =
        typeof this.tracks[i].gain === 'number'
          ? (this.tracks[i].gain as number)
          : 1;

      source.setVolumeGainLevel(gain);

      return playBackPromise;
    });
    this.sources.forEach((source, i) => {
      const cuein =
        typeof this.tracks[i].cuein === 'number'
          ? (this.tracks[i].cuein as number)
          : 0;
      const cueout =
        typeof this.tracks[i].cueout === 'number'
          ? (this.tracks[i].cueout as number)
          : source.getDuration();

      const trackStart = start + cuein;
      const trackEnd = typeof duration === 'number' ? duration : cueout;

      source.play(when, trackStart, trackEnd);
    });

    return this.playBackPromises;
  }

  stop() {
    this.sources.forEach(source => source.stop());
  }
}

export { Playout };
