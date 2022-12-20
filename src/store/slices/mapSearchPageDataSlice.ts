import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface MapSearchDataState {
  query: string;
  bbox: string;
  filters: Record<string, any>;
  defaultFiltersValues: Record<string, any>;
}

const initialState: MapSearchDataState = {
  query: '',
  bbox: '',
  filters: {},
  defaultFiltersValues: {},
};

export const mapSearchPageDataSlice = createSlice({
  name: 'mapSearchData',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.filters = { ...state.defaultFiltersValues };
      state.query = action.payload;
    },
    setFilterValue: (state, action) => {
      state.filters[action.payload.filterName] = action.payload.value;
    },
    resetFilterValues: (state, action) => {
      state.filters = { ...state.defaultFiltersValues };
    },
    setDefaultFiltersValues: (state, action) => {
      state.defaultFiltersValues = action.payload;
    },
    setFiltersValues: (state, action) => {
      state.filters = action.payload;
    },
    setBbox: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        bbox: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setQuery,
  setFilterValue,
  setBbox,
  resetFilterValues,
  setDefaultFiltersValues,
  setFiltersValues,
} = mapSearchPageDataSlice.actions;

export default mapSearchPageDataSlice.reducer;
