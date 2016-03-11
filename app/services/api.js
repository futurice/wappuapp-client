import Endpoints from '../constants/Endpoints';
import DeviceInfo from 'react-native-device-info';

const _post = (url, body) => {
  return fetch(url, {
    method: 'post',
    body: JSON.stringify(Object.assign(
      {},
      body,
      { 'user': DeviceInfo.getUniqueID() }
    ))
  });
}

const fetchModels = modelType => {
  const url = Endpoints.urls[modelType];

  return fetch(url)
    .then(response => response.json())
    .catch((error) => {
      console.log('Error catched on API-fetch', error);
      return Promise.reject(null);
    });
};

const postAction = payload => {
  return _post(Endpoints.action, payload)
    .then(response => response.json());
};

export default {
  fetchModels,
  postAction
};
