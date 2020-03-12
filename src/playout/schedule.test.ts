import { scheduleSourcePlayout, ITrackConfig } from './';

describe('Playout from the beginning', () => {
  test('No playout', () => {
    expect(scheduleSourcePlayout(0, 0, 0, {}, 0, 0)).toStrictEqual({
      when: 0,
      start: 0,
      duration: 0,
    });
  });

  test('Basic config', () => {
    expect(scheduleSourcePlayout(0, 15, 0, {}, 0, 0)).toStrictEqual({
      when: 0,
      start: 0,
      duration: 15,
    });
  });

  test('Fade config', () => {
    const config: ITrackConfig = {
      fadeIn: { duration: 1.5, shape: 'logarithmic' },
      fadeOut: { duration: 1, shape: 'linear' },
    };
    expect(scheduleSourcePlayout(0, 15, 0, config, 0, 0)).toStrictEqual({
      when: 0,
      start: 0,
      duration: 15,
      fadeIn: { start: 0, duration: 1.5, shape: 'logarithmic' },
      fadeOut: { start: 14, duration: 1, shape: 'linear' },
    });
  });

  test('Offset track', () => {
    expect(scheduleSourcePlayout(0, 15, 1, {}, 0, 0)).toStrictEqual({
      when: 1,
      start: 0,
      duration: 15,
    });
  });

  test('CueIn not 0', () => {
    expect(scheduleSourcePlayout(7, 15, 0, {}, 0, 0)).toStrictEqual({
      when: 0,
      start: 7,
      duration: 8,
    });
  });

  test('CueIn not 0 and offset track', () => {
    expect(scheduleSourcePlayout(7, 15, 2, {}, 0, 0)).toStrictEqual({
      when: 2,
      start: 7,
      duration: 8,
    });
  });

  test('CueIn not 0 and offset track with fades', () => {
    const config: ITrackConfig = {
      fadeIn: { duration: 1.5, shape: 'logarithmic' },
      fadeOut: { duration: 1, shape: 'linear' },
    };
    expect(scheduleSourcePlayout(7, 15, 2, config, 0, 0)).toStrictEqual({
      when: 2,
      start: 7,
      duration: 8,
      fadeIn: { start: 2, duration: 1.5, shape: 'logarithmic' },
      fadeOut: { start: 9, duration: 1, shape: 'linear' },
    });
  });
});

describe('Playout from set point', () => {
  test('No playout', () => {
    expect(scheduleSourcePlayout(0, 15, 0, {}, 0, 15)).toStrictEqual({
      when: 0,
      start: 0,
      duration: 0,
    });
  });

  test('Basic config', () => {
    expect(scheduleSourcePlayout(0, 15, 0, {}, 0, 1)).toStrictEqual({
      when: 0,
      start: 1,
      duration: 14,
    });
  });

  test('Fade config - fadeIn not schedule if start would be negative', () => {
    const config: ITrackConfig = {
      fadeIn: { duration: 1.5, shape: 'logarithmic' },
      fadeOut: { duration: 1, shape: 'linear' },
    };
    expect(scheduleSourcePlayout(0, 15, 0, config, 0, 1)).toStrictEqual({
      when: 0,
      start: 1,
      duration: 14,
      fadeOut: { start: 13, duration: 1, shape: 'linear' },
    });
  });

  test('Fade config - when allows for retro scheduling fade.', () => {
    const config: ITrackConfig = {
      fadeIn: { duration: 1.5, shape: 'logarithmic' },
      fadeOut: { duration: 1, shape: 'linear' },
    };
    expect(scheduleSourcePlayout(0, 15, 0, config, 2, 1)).toStrictEqual({
      when: 2,
      start: 1,
      duration: 14,
      fadeIn: { start: 1, duration: 1.5, shape: 'logarithmic' },
      fadeOut: { start: 15, duration: 1, shape: 'linear' },
    });
  });

  test('Offset track', () => {
    expect(scheduleSourcePlayout(0, 15, 1, {}, 0, 1)).toStrictEqual({
      when: 0,
      start: 0,
      duration: 15,
    });
  });

  test('CueIn not 0', () => {
    expect(scheduleSourcePlayout(7, 15, 0, {}, 0, 1)).toStrictEqual({
      when: 0,
      start: 8,
      duration: 7,
    });
  });

  test('CueIn not 0 and offset track', () => {
    expect(scheduleSourcePlayout(7, 15, 2, {}, 0, 1)).toStrictEqual({
      when: 1,
      start: 7,
      duration: 8,
    });
  });

  test('CueIn not 0 and offset track with fades', () => {
    const config: ITrackConfig = {
      fadeIn: { duration: 1.5, shape: 'logarithmic' },
      fadeOut: { duration: 1, shape: 'linear' },
    };
    expect(scheduleSourcePlayout(7, 15, 2, config, 0, 1)).toStrictEqual({
      when: 1,
      start: 7,
      duration: 8,
      fadeIn: { start: 1, duration: 1.5, shape: 'logarithmic' },
      fadeOut: { start: 8, duration: 1, shape: 'linear' },
    });
  });
});

describe('Playout with duration', () => {
  test('No playout', () => {
    expect(scheduleSourcePlayout(8, 15, 7, {}, 0, 0, 3)).toStrictEqual({
      when: 0,
      start: 0,
      duration: 0,
    });
  });
  test('Basic config', () => {
    expect(scheduleSourcePlayout(0, 15, 0, {}, 0, 0, 3)).toStrictEqual({
      when: 0,
      start: 0,
      duration: 3,
    });
  });

  test('Basic config long duration', () => {
    expect(scheduleSourcePlayout(0, 15, 0, {}, 0, 0, 16)).toStrictEqual({
      when: 0,
      start: 0,
      duration: 15,
    });
  });

  test('Fade config', () => {
    const config: ITrackConfig = {
      fadeIn: { duration: 1.5, shape: 'logarithmic' },
      fadeOut: { duration: 1, shape: 'linear' },
    };
    expect(scheduleSourcePlayout(0, 15, 0, config, 0, 0, 3)).toStrictEqual({
      when: 0,
      start: 0,
      duration: 3,
      fadeIn: { start: 0, duration: 1.5, shape: 'logarithmic' },
      fadeOut: { start: 14, duration: 1, shape: 'linear' },
    });
  });

  test('Fade config - when allows for retro scheduling fade.', () => {
    const config: ITrackConfig = {
      fadeIn: { duration: 1.5, shape: 'logarithmic' },
      fadeOut: { duration: 1, shape: 'linear' },
    };
    expect(scheduleSourcePlayout(0, 15, 0, config, 2, 1, 3)).toStrictEqual({
      when: 2,
      start: 1,
      duration: 3,
      fadeIn: { start: 1, duration: 1.5, shape: 'logarithmic' },
      fadeOut: { start: 15, duration: 1, shape: 'linear' },
    });
  });

  test('Offset track', () => {
    expect(scheduleSourcePlayout(0, 15, 1, {}, 0, 1, 3)).toStrictEqual({
      when: 0,
      start: 0,
      duration: 3,
    });
  });

  test('CueIn not 0', () => {
    expect(scheduleSourcePlayout(7, 15, 0, {}, 0, 1, 3)).toStrictEqual({
      when: 0,
      start: 8,
      duration: 3,
    });
  });

  test('CueIn not 0 and offset track', () => {
    expect(scheduleSourcePlayout(7, 15, 2, {}, 0, 1, 3)).toStrictEqual({
      when: 1,
      start: 7,
      duration: 2,
    });
  });

  test('CueIn not 0 and offset negative track long duration', () => {
    expect(scheduleSourcePlayout(7, 15, 2, {}, 0, 4, 15)).toStrictEqual({
      when: 0,
      start: 9,
      duration: 6,
    });
  });

  test('CueIn not 0 and offset positive track long duration', () => {
    expect(scheduleSourcePlayout(7, 15, 2, {}, 0, 1, 15)).toStrictEqual({
      when: 1,
      start: 7,
      duration: 8,
    });
  });

  test('CueIn not 0 and offset track with fades', () => {
    const config: ITrackConfig = {
      fadeIn: { duration: 1.5, shape: 'logarithmic' },
      fadeOut: { duration: 1, shape: 'linear' },
    };
    expect(scheduleSourcePlayout(7, 15, 2, config, 0, 1, 3)).toStrictEqual({
      when: 1,
      start: 7,
      duration: 2,
      fadeIn: { start: 1, duration: 1.5, shape: 'logarithmic' },
      fadeOut: { start: 8, duration: 1, shape: 'linear' },
    });
  });
});
