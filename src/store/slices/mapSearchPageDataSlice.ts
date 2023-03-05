import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CurrentMapPositionI {
  zoom: number;
  center: [number, number];
  bbox: string;
}

interface DesiredMapPositionI {
  zoom: number;
  center: [number, number];
}

export interface MapSearchDataState {
  query: string;
  currentMapPosition: CurrentMapPositionI | null;
  desiredMapPosition: DesiredMapPositionI | null;
  filters: Record<string, unknown>;
  defaultFiltersValues: Record<string, unknown>;
  visibleLayersIds: string[];
}

const initialState: MapSearchDataState = {
  query: '',
  filters: {},
  currentMapPosition: null,
  desiredMapPosition: null,
  defaultFiltersValues: {},
  visibleLayersIds: [],
};

export const mapSearchPageDataSlice = createSlice({
  name: 'mapSearchData',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.filters = { ...state.defaultFiltersValues };
      state.query = action.payload;
      state.currentMapPosition = null;
    },
    setFilterValue: (state, action) => {
      state.filters[action.payload.filterName] = action.payload.value;
      state.currentMapPosition = null;
    },
    resetFilterValues: (state) => {
      state.filters = { ...state.defaultFiltersValues };
      state.currentMapPosition = null;
    },
    setDefaultFiltersValues: (state, action) => {
      state.defaultFiltersValues = action.payload;
      state.currentMapPosition = null;
    },
    setFiltersValues: (state, action) => {
      state.filters = action.payload;
      state.currentMapPosition = null;
    },
    setCurrentMapPosition: (state, action: PayloadAction<CurrentMapPositionI | null>) => {
      state.currentMapPosition = action.payload;
    },
    setDesiredMapPosition: (state, action: PayloadAction<DesiredMapPositionI | null>) => {
      state.desiredMapPosition = action.payload;
    },
    setVisibleLayersIds: (state, action: PayloadAction<string[]>) => {
      state.visibleLayersIds = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setQuery,
  setFilterValue,
  setDesiredMapPosition,
  setCurrentMapPosition,
  resetFilterValues,
  setDefaultFiltersValues,
  setFiltersValues,
  setVisibleLayersIds,
} = mapSearchPageDataSlice.actions;

export default mapSearchPageDataSlice.reducer;
