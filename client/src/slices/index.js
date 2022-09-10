import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import showAlert from '../utils/showAlert';

export const initialState = {
  countries: [],
  copyCountries: [],
  country: {},
  activities: [],
  show: false,
  loading: false,
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    loadingCountries: (state) => {
      state.loading = true
    },
    getCountries: (state, {payload}) => {
      state.copyCountries = state.countries = payload
      state.loading = false
    },
    getCountry: (state, {payload}) => {
      state.country = payload
    },
    getActivities: (state, {payload}) => {
      state.activities = payload
    },
    filterCountriesByContinent: (state, {payload}) => {
      state.countries = state.copyCountries.filter((c) => c.continent === payload)
    },
    filterCountriesByActivity: (state, {payload}) => {
      const filter = state.copyCountries.map((c) => 
        c.activities?.find(({name}) => name === payload)
      )
      state.countries = filter.filter((c) => c !== undefined)
    },
    sortCountriesByString: (state, {payload}) => {
      let paises = null
      if (payload === 'asc') {
        paises = state.copyCountries.slice().sort((a, b) => a.nameEn.localeCompare(b.nameEn))
      } else {
        paises = state.copyCountries.slice().sort((a, b) => b.nameEn.localeCompare(a.nameEn))
      }
      state.countries = paises
    },
    sortCountriesByInt: (state, {payload}) => {
      let paises = null
      if (payload === 'asc') {
        paises = state.copyCountries.slice().sort((a, b) => a.population - b.population)
      } else {
        paises = state.copyCountries.slice().sort((a, b) => b.population - a.population)
      }
      state.countries = paises
    },
    showAdvanced: (state, {payload}) => {
      state.show = payload
    },
  }
})

export const {
  loadingCountries,
  getCountries, 
  getCountry,
  getActivities,
  filterCountriesByContinent,
  filterCountriesByActivity,
  sortCountriesByString,
  sortCountriesByInt,
  showAdvanced,
} = countrySlice.actions;

export const countrySelector = state => state;

export default countrySlice.reducer;

const URL_COUNTRY = 'http://localhost:3001/api/countries';
const URL_ACTIVITY = 'http://localhost:3001/api/activities';

export const fetchCountries = () => async dispatch => {
  try {
    dispatch(loadingCountries());
    const {data} = await axios(URL_COUNTRY);
    dispatch(getCountries(data));
  } catch (e) {
    showAlert('Opps!', e.response.data, 'error');
  }
};

export const fetchFilterCountries = (option, value) => dispatch => {
  try {
    switch (option) {
      case 'continent':
        dispatch(filterCountriesByContinent(value));
        break;
  
      case 'activity':
        dispatch(filterCountriesByActivity(value));
        break;
    
      default:
        break;
    }
  } catch (e) {
    showAlert('Opps!', e.message, 'error');
  }
};

export const fetchOrderCountries = (option, sort) => dispatch => {
  try {
    switch (option) {
      case 'name':
        dispatch(sortCountriesByString(sort));
        break;
  
      case 'population':
        dispatch(sortCountriesByInt(sort));
        break;
    
      default:
        break;
    }
  } catch (e) {
    showAlert('Opps!', e.message, 'error');
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

export const fetchActivities = () => async dispatch => {
  try {
    const {data} = await axios(URL_ACTIVITY);
    dispatch(getActivities(data));
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

export const changeOptionAdvanced = (value) => dispatch => {
  try {
    dispatch(showAdvanced(value));
  } catch (e) {
    return showAlert('Opps!', e.message, 'error');
  }
}