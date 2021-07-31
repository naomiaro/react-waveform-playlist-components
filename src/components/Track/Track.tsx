import React, { FunctionComponent, ReactNode, useContext } from 'react';
import styled, { withTheme, DefaultTheme } from 'styled-components';
import { PlaylistInfoContext } from '../../contexts/PlaylistInfo';
import { Container } from './Container';

const ChannelContainer = styled.div`
  position: relative;
`;

export interface ControlsWrapperProps {
  readonly controlWidth: number;
}
const ControlsWrapper = styled.div<ControlsWrapperProps>`
  width: ${props => props.controlWidth}px;
  position: absolute;
  z-index: 1;
  left: 0;
  height: 100%;
`;

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
      <ControlsWrapper controlWidth={show ? width : 0}>
        {controls}
      </ControlsWrapper>
      <ChannelContainer>{children}</ChannelContainer>
    </Container>
  );
};

export const StyledTrack = withTheme(Track);
