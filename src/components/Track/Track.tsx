import React, { FunctionComponent, ReactNode, useContext } from 'react';
import { withTheme, DefaultTheme } from 'styled-components';
import { PlaylistInfoContext } from '../../contexts/PlaylistInfo';
import { Container } from './Container';
import { ChannelContainer } from './ChannelContainer';

export interface TrackProps {
  className?: string;
  theme?: DefaultTheme;
  children: ReactNode;
  controls?: ReactNode;
  numChannels: number;
}

export const Track: FunctionComponent<TrackProps> = ({
  numChannels,
  children,
  className,
  controls,
}) => {
  const {
    waveHeight,
    controls: { show, width },
  } = useContext(PlaylistInfoContext);
  return (
    <Container
      numChannels={numChannels}
      className={className}
      waveHeight={waveHeight}
      controlWidth={show ? width : 0}
    >
      {controls}
      <ChannelContainer>{children}</ChannelContainer>
    </Container>
  );
};

export const StyledTrack = withTheme(Track);
