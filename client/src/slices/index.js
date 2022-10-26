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
  path: '',
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    loadingCountries: (state) => {
      state.loading = true
    },
    showAdvanced: (state, {payload}) => {
      state.show = payload
    },
    changePath: (state, {payload}) => {
      state.path = payload
    },
    getCountriesFilter: (state, {payload}) => {
      state.countries = payload
    },
    getCountries: (state, {payload}) => {
      state.countries = state.copyCountries = payload
      state.loading = false
    },
    getCountry: (state, {payload}) => {
      state.country = payload
    },
    getActivities: (state, {payload}) => {
      state.activities = payload
    },
    filterCountriesByContinent: (state, {payload}) => {
      state.countries = state.copyCountries.slice().filter((c) => c.continent === payload)
    },
    filterCountriesByActivity: (state, {payload}) => {
      state.countries = state.copyCountries.slice().filter((c) => {
        const res = c.activities?.find(({name}) => name === payload)
        if (res) return c
        return false
      })
    },
    sortCountriesByString: (state, {payload}) => {
      let paises = null
      if (payload === 'asc') {
        paises = state.countries.slice().sort((a, b) => a.nameEn.localeCompare(b.nameEn))
      } else {
        paises = state.countries.slice().sort((a, b) => b.nameEn.localeCompare(a.nameEn))
      }
      state.countries = paises
    },
    sortCountriesByInt: (state, {payload}) => {
      let paises = null
      if (payload === 'asc') {
        paises = state.countries.slice().sort((a, b) => a.population - b.population)
      } else {
        paises = state.countries.slice().sort((a, b) => b.population - a.population)
      }
      state.countries = paises
    },
  }
})

export const {
  loadingCountries,
  showAdvanced,
  changePath,
  getCountriesFilter,
  getCountries, 
  getCountry,
  getActivities,
  filterCountriesByContinent,
  filterCountriesByActivity,
  sortCountriesByString,
  sortCountriesByInt,
} = countrySlice.actions;

export const countrySelector = state => state;

export default countrySlice.reducer;

const URL_COUNTRY = 'https://pi-countries-main-production-f93b.up.railway.app/api/countries';
const URL_ACTIVITY = 'https://pi-countries-main-production-f93b.up.railway.app/api/activities';

export const changeOptionAdvanced = (value) => dispatch => {
  try {
    dispatch(showAdvanced(value));
  } catch (e) {
    return showAlert('Opps!', e.message, 'error');
  }
};

export const changeLocation = (path) => dispatch => {
  try {
    dispatch(showAdvanced(false));
    dispatch(changePath(path));
  } catch (e) {
    return showAlert('Opps!', e.message, 'error');
  }
};

export const fetchCountries = () => async dispatch => {
  try {
    dispatch(loadingCountries());
    dispatch(showAdvanced(false));
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
    dispatch(showAdvanced(false));
    const {data} = await axios(`${URL_COUNTRY}?name=${name}`);
    dispatch(getCountriesFilter(data));
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
