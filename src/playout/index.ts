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
  cueIn?: number;
  // where the waveform for this track should end
  // ex (Waveform will end at 30 second into this track)
  // DEFAULT duration of the track
  cueOut?: number;
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
  playBackPromises: Promise<void>[] | undefined;
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
    this.configure(this.trackConfigs);
  }

  get duration() {
    let duration = 0;
    for (let i = 0; i < this.sources.length; i++) {
      duration = Math.max(duration, this.sources[i].duration);
    }

    return duration;
  }

  configure(configs: TrackConfig[]) {
    configs.forEach((config, i) => {
      const track = this.sources[i];
      track.setCues(config.cueIn, config.cueOut, config.start);
    });
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

    const now = AUDIO_CONTEXT.currentTime;
    console.log(`NOW ${now}`);
    this.sources.forEach((source, i) => {
      const cueIn = source.cueIn;
      const cueOut = source.cueOut;
      const offset = source.offset;

      const fadeIn = this.trackConfigs[i].fadeIn;
      const fadeOut = this.trackConfigs[i].fadeOut;

      const clipped = start - offset;
      console.log(`CLIPPED ${clipped}`);
      const trackLength = cueOut - cueIn;
      const playLength =
        typeof duration === 'number' && duration < trackLength
          ? duration
          : trackLength;

      if (clipped >= playLength) {
        // nothing to play, but need to resolve the source setup
        source.play(0, 0, 0);
      } else {
        const when = now + Math.abs(Math.min(0, clipped));
        const trackStart = clipped < 0 ? cueIn : cueIn + clipped;
        const trackDuration = Math.min(playLength, playLength + clipped);

        console.log(this.duration);
        console.log(`${when} ${trackStart} ${trackDuration}`);

        if (fadeIn) {
          source.applyFadeIn(when, fadeIn.duration, fadeIn.shape);
          console.log(`FADEIN ${when} ${fadeIn.duration} ${fadeIn.shape}`);
        }

        if (fadeOut) {
          const start = when + trackLength - fadeOut.duration;
          source.applyFadeOut(start, fadeOut.duration, fadeOut.shape);
          console.log(`FADEOUT ${start} ${fadeOut.duration} ${fadeOut.shape}`);
        }

        source.play(when, trackStart, trackDuration);
      }
    });

    return this.playBackPromises;
  }

  stop() {
    this.sources.forEach(source => source.stop());
  }
}

export { Playout };
