declare type Peaks = Int8Array | Int16Array | Int32Array;
declare type Bits = 8 | 16 | 32;

declare module 'webaudio-peaks' {
  function extractPeaks(
    source: AudioBuffer,
    samplesPerPixel: number,
    isMono: boolean,
    cueIn: number,
    cueOut: number,
    bits: Bits
  ): {
    length: number;
    data: Peaks[];
    bits: Bits;
  };
  export = extractPeaks;
}
