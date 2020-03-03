import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    waveOutlineColor: string;
    waveFillColor: string;
    waveProgressColor: string;
    waveHeight: number;
    timeColor: string;
    timeScaleHeight: number;
    controlWidth: number;
  }
}
