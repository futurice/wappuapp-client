import { Alert, Platform, AsyncStorage } from 'react-native';
import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import api from '../services/api';
import {createRequestActionTypes} from '../actions';
import { fetchFeed } from '../actions/feed';
import { fetchTeams } from '../actions/team';
import { fetchEvents } from '../actions/event';

import { APP_STORAGE_KEY } from '../../env';
const cityKey = `${APP_STORAGE_KEY}:city`;
const IOS = Platform.OS === 'ios';

// # Action creators

// TODO: Setting city should re-fetch feed, events and teams
export const SET_CITY = 'city/SET_CITY';
export const setCity = (cityId) => dispatch => {
  // set to state
  dispatch({ type: SET_CITY, payload: cityId })

  // set to local storage
  AsyncStorage.setItem(cityKey, JSON.stringify(cityId))
    .then(() => console.log('test') || dispatch(fetchCitySpecificContent()));
}

const SET_CITY_LIST = 'city/SET_CITY_LIST';
const {
  GET_CITY_LIST_REQUEST,
  GET_CITY_LIST_SUCCESS,
  GET_CITY_LIST_FAILURE
} = createRequestActionTypes('GET_CITY_LIST');

export const fetchCities = () => dispatch => {
  dispatch({ type: GET_CITY_LIST_REQUEST });

  return api.fetchModels('cities')
  .then(cities => {
    dispatch({ type: GET_CITY_LIST_SUCCESS });
    return dispatch({
      type: SET_CITY_LIST,
      payload: cities
    });
  })
  .catch(error => dispatch({ type: GET_CITY_LIST_FAILURE, error: true, payload: error }));
};


const getCitySelectionText = (city, cityId, activeCityId) =>
  cityId === activeCityId ? `✓ ${city}` : city;

export const openCitySelection = () => (dispatch, getState) => {
  const state = getState();
  const activeCityId = getCityId(state);
  const cityList = getCityList(state);

  const alertOptions = cityList.toJS().map(city => ({
    text: getCitySelectionText(city.name, city.id, activeCityId),
    onPress: () => dispatch(setCity(city.id))
  }))

  return Alert.alert(
    'Choose city',
    IOS ? 'See Whappu action in' : '',
    alertOptions,
    { cancellable: true }
  );
}

export const initializeUsersCity = () => (dispatch, getState) => {
  const cityList = getCityList(getState());
  const defaultCityId = cityList.getIn([0, 'id'], '').toString()
  return AsyncStorage.getItem(cityKey)
    .then(city => {
      const activeCity = city ? JSON.parse(city) : defaultCityId;
      return dispatch(setCity(activeCity));
    })
    .catch(error => { console.log('error when setting city') });
};

const FETCH_CITY_CONTENT_SUCCESS = 'city/FETCH_CITY_CONTENT_SUCCESS';
export const fetchCitySpecificContent = () => dispatch =>
  Promise.all([
    dispatch(fetchFeed()),
    dispatch(fetchEvents()),
    dispatch(fetchTeams())
  ])
  .then(() => dispatch({ type: FETCH_CITY_CONTENT_SUCCESS }))


// # Selectors
export const getCityList = state => state.city.get('list');
export const getCityId = state => state.city.get('id');

// # Reducer
const initialState = fromJS({
  id: null,
  list: []
});

export default function city(state = initialState, action) {
  switch (action.type) {
    case SET_CITY_LIST: {
      return state.set('list', fromJS(action.payload));
    }

    case SET_CITY: {
      return state.set('id', action.payload);
    }

    default: {
      return state;
    }
  }
}
