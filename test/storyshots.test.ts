import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';
import { Page } from 'puppeteer';
import path from 'path';

// https://github.com/storybookjs/storybook/issues/5132#issuecomment-736414609
// const beforeScreenshot = (page: Page) =>
//   page.$('#root > *').then((root) => root ?? undefined);

const beforeScreenshot = () => {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, 600)
  );
};

const customizePage = (page: Page) =>
  page.setViewport({ width: 1920, height: 1080 });

initStoryshots({
  suite: 'Image storyshots',
  test: imageSnapshot({
    storybookUrl: `file://${path.resolve(__dirname, '../storybook-static')}`,
    beforeScreenshot,
    customizePage,
  }),
});
