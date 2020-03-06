import { load } from '../loading';
import { WebAudioPlayoutSource } from './WebAudioPlayoutSource';

const AUDIO_CONTEXT = new AudioContext();

type FadeCurve = 'logarithmic' | 'linear' | 'sCurve' | 'exponential';

type AudioSource = string | File;

interface TrackConfig {
  // volume level of the track between [0-1]
  gain?: number;
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
  tracks: AudioSource[];
  trackConfigs: TrackConfig[];
  buffers: AudioBuffer[];
  sources: WebAudioPlayoutSource[];
  playBackPromises: Promise<unknown>[] | undefined;
  masterGain: number;
  constructor(tracks: AudioSource[], trackConfigs?: TrackConfig[]) {
    this.tracks = tracks;
    this.trackConfigs = trackConfigs || Array(tracks.length).fill({});
    this.buffers = [];
    this.sources = [];
    this.masterGain = 1;
  }
  async load() {
    this.buffers = await Promise.all(
      this.tracks.map(track => load(track, AUDIO_CONTEXT))
    );
    this.sources = this.buffers.map(
      buffer => new WebAudioPlayoutSource(AUDIO_CONTEXT, buffer)
    );
  }

  configure(configs: TrackConfig[]) {
    this.trackConfigs = configs;
  }

  setMasterGain(gain: number) {
    let masterGain = gain;
    if (gain > 1) {
      masterGain = 1;
    } else if (gain < 0) {
      masterGain = 0;
    }
    this.masterGain = masterGain;
  }

  play(when: number = 0, start: number = 0, duration?: number) {
    this.playBackPromises = this.sources.map((source, i) => {
      const playBackPromise = source.setUpSource();
      const gain =
        typeof this.trackConfigs[i].gain === 'number'
          ? (this.trackConfigs[i].gain as number)
          : 1;

      source.setVolumeGainLevel(gain);
      source.setMasterGainLevel(this.masterGain);

      return playBackPromise;
    });
    this.sources.forEach((source, i) => {
      const cuein =
        typeof this.trackConfigs[i].cuein === 'number'
          ? (this.trackConfigs[i].cuein as number)
          : 0;
      const cueout =
        typeof this.trackConfigs[i].cueout === 'number'
          ? (this.trackConfigs[i].cueout as number)
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
