declare type Peaks = Int8Array | Int16Array | Int32Array;

declare module 'webaudio-peaks' {
  function extractPeaks(
    source: AudioBuffer,
    samplesPerPixel: number,
    isMono: boolean,
    cueIn: number,
    cueOut: number,
    bits: number
  ): {
    length: number;
    data: Peaks[];
    bits: 8 | 16 | 32;
  };
  export = extractPeaks;
}
