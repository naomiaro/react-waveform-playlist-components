import { scheduleSourcePlayout } from './';

// const config: ITrackConfig = {
//   fadeIn: { duration: 1, shape: 'linear' },
//   fadeOut: { duration: 1, shape: 'linear' },
// };

test('Basic config', () => {
  expect(scheduleSourcePlayout(0, 15, 0, {}, 0, 0)).toStrictEqual({
    when: 0,
    start: 0,
    duration: 15,
  });
});
