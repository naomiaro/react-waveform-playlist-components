import React, { FunctionComponent, ReactNode } from 'react';
import { withTheme, DefaultTheme } from 'styled-components';
import { Container } from './Container';
import { ChannelContainer } from './ChannelContainer';

export interface TrackProps {
  className?: string;
  theme?: DefaultTheme;
  children: ReactNode;
  controls: ReactNode | null;
  numChannels: number;
}

export const Track: FunctionComponent<TrackProps> = ({
  numChannels,
  children,
  className,
  controls,
}) => {
  return (
    <Container numChannels={numChannels} className={className}>
      {controls}
      <ChannelContainer>{children}</ChannelContainer>
    </Container>
  );
};

export const StyledTrack = withTheme(Track);
