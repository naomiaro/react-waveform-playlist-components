// import React from 'react';
// import {
//   WebAudioProvider,
//   WebAudioProviderProps,
// } from '../src/contexts/WebAudio';
// import { SmartChannel } from '../src/components/Channel';
// import { StyledTrack } from '../src/components/Track';

// export default {
//   title: 'WebAudioContext',
// };

// export const Default = (args: WebAudioProviderProps) => (
//   <WebAudioProvider {...args}>
//     {(peaks, bits, length) => (
//       <StyledTrack numChannels={peaks.length} controls={null}>
//         {peaks.map((data, index) => (
//           <SmartChannel
//             key={index}
//             index={index}
//             data={data}
//             bits={bits}
//             length={length}
//           />
//         ))}
//       </StyledTrack>
//     )}
//   </WebAudioProvider>
// );

// Default.args = {
//   source: 'audio/Vocals30.mp3',
//   showMultiChannel: false,
//   samplesPerPixel: 1000,
//   bits: 16,
// };

// Default.argTypes = {
//   bits: { control: { type: 'select', options: { 8: 8, 16: 16, 32: 32 } } },
//   source: {
//     control: {
//       type: 'select',
//       options: {
//         'audio/Vocals30.mp3': 'audio/Vocals30.mp3',
//         'audio/Guitar30.mp3': 'audio/Guitar30.mp3',
//         'audio/PianoSynth30.mp3': 'audio/PianoSynth30.mp3',
//         'audio/BassDrums30.mp3': 'audio/BassDrums30.mp3',
//       },
//     },
//   },
//   samplesPerPixel: {
//     control: {
//       type: 'range',
//       min: 50,
//       max: 5000,
//     },
//   },
// };
