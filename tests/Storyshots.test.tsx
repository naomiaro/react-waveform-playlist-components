import initStoryshots from '@storybook/addon-storyshots';
import 'jest-styled-components';
import { mount } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';

initStoryshots({
  renderer: mount,
  //@ts-ignore
  snapshotSerializers: [createSerializer()],
});
