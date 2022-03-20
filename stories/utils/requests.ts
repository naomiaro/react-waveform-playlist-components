import VOCALS_MONO_8BIT_JSON from '../../media/json/vocals_mono_8bit.json';
import VOCALS_MONO_16BIT_JSON from '../../media/json/vocals_mono_16bit.json';
import VOCALS_MULTI_8BIT_JSON from '../../media/json/vocals_multi_8bit.json';
import VOCALS_MULTI_16BIT_JSON from '../../media/json/vocals_multi_16bit.json';

export const BBC_DATA_REQUESTS = [
  {
    url: 'json/vocals_mono_8bit.json',
    method: 'GET',
    status: 200,
    response: VOCALS_MONO_8BIT_JSON,
  },
  {
    url: 'json/vocals_mono_16bit.json',
    method: 'GET',
    status: 200,
    response: VOCALS_MONO_16BIT_JSON,
  },
  {
    url: 'json/vocals_multi_8bit.json',
    method: 'GET',
    status: 200,
    response: VOCALS_MULTI_8BIT_JSON,
  },
  {
    url: 'json/vocals_multi_16bit.json',
    method: 'GET',
    status: 200,
    response: VOCALS_MULTI_16BIT_JSON,
  },
];
