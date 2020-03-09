import { load } from '../loading';
import { WebAudioPlayoutSource } from './WebAudioPlayoutSource';

const AUDIO_CONTEXT = new AudioContext();

type FadeCurve = 'logarithmic' | 'linear' | 'sCurve' | 'exponential';
type FadeDefinition = {
  shape: FadeCurve;
  // length of fade from beginning or end of the track, in seconds.
  duration: number;
};
type AudioSource = string | File;

interface TrackConfig {
  // volume level of the track between [0-1]
  gain?: number;
  // time in seconds relative to the playlist
  // ex (track will start after 8.5 seconds)
  // can be negative.
  // DEFAULT 0 - track starts at beginning of playlist
  start?: number;
  // track fade in details
  fadeIn?: FadeDefinition;
  // track fade out details
  fadeOut?: FadeDefinition;
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

function clampGain(gain: number) {
  if (gain > 1) {
    return 1;
  } else if (gain < 0) {
    return 0;
  }

  return gain;
}

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

  get duration() {
    let duration = 0;
    for (let i = 0; i < this.sources.length; i++) {
      const cuein =
        typeof this.trackConfigs[i].cuein === 'number'
          ? (this.trackConfigs[i].cuein as number)
          : 0;

      const cueout =
        typeof this.trackConfigs[i].cueout === 'number'
          ? (this.trackConfigs[i].cueout as number)
          : this.sources[i].getDuration();
      const start = this.trackConfigs[i].start || 0;
      duration = Math.max(duration, cueout - cuein + start);
    }

    return duration;
  }

  configure(configs: TrackConfig[]) {
    this.trackConfigs = configs;
  }

  setMasterGain(gain: number) {
    this.masterGain = clampGain(gain);
  }

  /*
   * @param start - time in seconds relative to playlist to start playing.
   * @param duration - time in seconds to continue playout.
   */
  play(start: number = 0, duration?: number) {
    this.playBackPromises = this.sources.map((source, i) => {
      const playBackPromise = source.setUpSource();
      const gain =
        typeof this.trackConfigs[i].gain === 'number'
          ? clampGain(this.trackConfigs[i].gain as number)
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

      const offset =
        typeof this.trackConfigs[i].start === 'number'
          ? (this.trackConfigs[i].start as number)
          : 0;

      const clipped = start - offset;
      const trackLength = cueout - cuein;
      const playLength = typeof duration === 'number' ? duration : trackLength;

      if (clipped >= trackLength) {
        source.play(0, 0, 0);
      } else {
        const when = AUDIO_CONTEXT.currentTime + Math.abs(Math.min(0, clipped));
        const trackStart = clipped < 0 ? cuein : cuein + clipped;
        const trackEnd = Math.min(
          playLength - trackStart,
          trackLength - clipped
        );

        console.log(this.duration);
        console.log(`${when} ${trackStart} ${trackEnd}`);

        source.play(when, trackStart, trackEnd);
      }
    });

    return this.playBackPromises;
  }

  stop() {
    this.sources.forEach(source => source.stop());
  }
}

export { Playout };
