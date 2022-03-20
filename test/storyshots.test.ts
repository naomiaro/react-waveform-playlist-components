import { join } from 'path';
import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot, Context } from '@storybook/addon-storyshots-puppeteer';

const getMatchOptions = ({ context }: { context: Context }) => {
  const snapshotPath = join(
    'test',
    '__snapshots__',
    context.kind,
    context.story
  );

  return { customSnapshotsDir: snapshotPath };
};

// Delays snapshot, mostly for CI
const beforeScreenshot = () => {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, 500)
  );
};

initStoryshots({
  // integrityOptions: { cwd: join(__dirname, 'packages', 'component') },
  // configPath: join(__dirname, '.storybook'),
  test: imageSnapshot({
    beforeScreenshot,
    getMatchOptions,
  }),
});

// import initStoryshots from '@storybook/addon-storyshots';
// import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';
// import puppeteer, { Page, Browser } from 'puppeteer';

// const HOST_IP = process.env.HOST_IP;
// const VIEWPORT = { width: 1280, height: 720, deviceScaleFactor: 2 };
// let browser: Browser;

// const testFn = imageSnapshot({
//   storybookUrl: 'file:///opt/storybook-static',
//   getCustomBrowser: async () => {
//     browser = await puppeteer.connect({
//       browserWSEndpoint: (() => {
//         // For CI env's: If running in docker inside docker, you'll need the IP address of the host
//         if (HOST_IP) {
//           return `ws://${HOST_IP}:9222`;
//         }
//         return 'ws://localhost:9222';
//       })(),
//     });
//     return browser;
//   },
//   beforeScreenshot: async (page: Page) => {
//     await new Promise((res) => setTimeout(res, 6000));
//     // const fullPage = await page.$('#root > *');
//     const fullPage = await page.$('body');
//     const data = await page.evaluate(() => document.documentElement.outerHTML);

//     console.log(data);
//     if (fullPage === null) {
//       return Promise.reject(new Error('No root element found'));
//     }
//     const fullPageSize = await fullPage.boundingBox();
//     await page.setViewport({
//       ...VIEWPORT,
//       height: fullPageSize ? ~~fullPageSize.height : VIEWPORT.height,
//     });
//   },
//   getScreenshotOptions: () => {
//     return {
//       encoding: 'base64',
//       fullPage: false,
//     };
//   },
// });

// // Override 'afterAll' so jest doesn't hang
// testFn.afterAll = async () => {
//   if (browser) {
//     browser.close();
//   }
// };

// initStoryshots({
//   test: testFn,
// });

// /***

// https://github.com/storybookjs/storybook/issues/7587

// docker run -d --rm \
//   -p 9222:3000 \
//   -e "CONNECTION_TIMEOUT=600000" \
//   -e "ALLOW_FILE_PROTOCOL=true" \
//   -v /Users/naomiaro/Code/react-waveform-playlist-components/storybook-static:/opt/storybook-static \
//   browserless/chrome
//   */
