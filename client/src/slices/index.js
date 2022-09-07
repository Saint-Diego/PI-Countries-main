import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import showAlert from '../utils/showAlert';

export const initialState = {
  countries: [],
  copyCountries: [],
  country: {},
  page: 1,
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    getCountries: (state, {payload}) => {
      state.copyCountries = state.countries = payload
    },
    getCountry: (state, {payload}) => {
      state.country = payload
    },
    filterCountriesByContinent: (state, {payload}) => {
      const {countries, continent} = payload
      let filter = null;
      if (continent !== 'All') filter = countries.filter((c) => c.continent === continent);
      else filter = state.copyCountries
      state.countries = filter
    },
    filterCountriesByActivity: (state, {payload}) => {
      const {countries, activity} = payload
      let filter = null;
      if (activity !== 'All') filter = countries.map((c) => 
        c.activity.find(({name}) => name === activity)
      );
      else filter = state.copyCountries
      state.countries = filter
    },
    sortCountriesByString: (state, {payload}) => {
      const { countries, sort } = payload
      let paises = null
      if (sort === 'asc') {
        paises = countries.slice().sort((a, b) => a.name.localeCompare(b.name))
      } else {
        paises = countries.slice().sort((a, b) => b.name.localeCompare(a.name))
      }
      state.countries = paises
    },
    sortCountriesByInt: (state, {payload}) => {
      const { countries, sort } = payload
      let paises = null
      if (sort === 'asc') {
        paises = countries.slice().sort((a, b) => a.population - b.population)
      } else {
        paises = countries.slice().sort((a, b) => b.population - a.population)
      }
      state.countries = paises
    },
  }
})

export const {
  getCountries, 
  getCountry,
  filterCountriesByContinent,
  filterCountriesByActivity,
  sortCountriesByString,
  sortCountriesByInt,
} = countrySlice.actions;

export const countrySelector = state => state;

export default countrySlice.reducer;

const URL_COUNTRY = 'http://localhost:3001/api/countries';
const URL_ACTIVITY = 'http://localhost:3001/api/activities';

export const fetchCountries = () => async dispatch => {
  try {
    const {data} = await axios(URL_COUNTRY);
    dispatch(getCountries(data));
  } catch (e) {
    showAlert('Opps!', e.response.data, 'error');
  }
};

export const fetchFilterCountriesByContinent = (countries, continent) => dispatch => {
  try {
    dispatch(filterCountriesByContinent({countries, continent}));
  } catch (e) {
    showAlert('Opps!', e.message, 'error');
  }
};

export const fetchFilterCountriesByActivity = (countries, activity) => dispatch => {
  try {
    dispatch(filterCountriesByActivity({countries, activity}));
  } catch (e) {
    showAlert('Opps!', e.message, 'error');
  }
};

export const fetchOrderCountries = (countries, {option, sort}) => dispatch => {
  switch (option) {
    case 'a-z':
      dispatch(sortCountriesByString({countries,sort}));
      break;

    case 'poblacion':
      dispatch(sortCountriesByInt({countries,sort}));
      break;
  
    default:
      break;
  }
};

export const fetchCountryById = (id) => async dispatch => {
  try {
    const {data} = await axios(`${URL_COUNTRY}/${id}`);
    dispatch(getCountry(data));
  } catch (e) {
    return showAlert('Opps!', e.response.data, 'error');
  }
};

export const fetchCountryByName = (name) => async dispatch => {
  try {
    const {data} = await axios(`${URL_COUNTRY}?name=${name}`);
    dispatch(getCountries(data));
  } catch (e) {
    return showAlert('Opps!', e.response.data, 'error');
  }
};

export const fetchCreateActivity = (activity) => async () => {
  try {
    const {data} = await axios.post(URL_ACTIVITY, activity);
    return showAlert(data, '', 'success');
  } catch (e) {
    return showAlert('Opps!', e.response.data, 'error');
  }
};