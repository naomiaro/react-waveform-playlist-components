declare module 'webaudio-peaks' {
  function extractPeaks(
    source: AudioBuffer,
    samplesPerPixel: number,
    isMono: boolean,
    cueIn: number,
    cueOut: number,
    bits: number
  ): Int8Array | Int16Array | Int32Array;
  export = extractPeaks;
}
