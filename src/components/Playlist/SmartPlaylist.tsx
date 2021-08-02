// import React, { FunctionComponent } from 'react';
// import { Bits } from 'webaudio-peaks';
// import { SmartChannel } from '../Channel';
// import { SmartScale } from '../TimeScale';
// import { StyledTrack } from '../Track';
// import { Playlist } from './Playlist';

// export interface SmartPlaylistProps {
//   readonly controls?: JSX.Element | JSX.Element[];
// }
// export const SmartPlaylist: FunctionComponent<SmartPlaylistProps> = ({
//   controls,
// }) => {
//   return (
//     <Playlist>
//       <SmartScale />
//       <StyledTrack numChannels={2} controls={makeControls('Track 1')}>
//         <SmartChannel
//           data={new Int16Array(BBCWaveformData.data)}
//           bits={BBCWaveformData.bits as Bits}
//           length={BBCWaveformData.length}
//           index={0}
//         />
//         <SmartChannel
//           data={new Int16Array(BBCWaveformData.data)}
//           bits={BBCWaveformData.bits as Bits}
//           length={BBCWaveformData.length}
//           index={1}
//         />
//       </StyledTrack>
//       <StyledTrack numChannels={2} controls={makeControls('Track 2')}>
//         <SmartChannel
//           data={new Int16Array(BBCWaveformData.data)}
//           bits={BBCWaveformData.bits as Bits}
//           length={BBCWaveformData.length}
//           index={0}
//         />
//         <SmartChannel
//           data={new Int16Array(BBCWaveformData.data)}
//           bits={BBCWaveformData.bits as Bits}
//           length={BBCWaveformData.length}
//           index={1}
//         />
//       </StyledTrack>
//     </Playlist>
//   );
// };
