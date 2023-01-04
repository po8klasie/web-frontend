import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ComparisonState {
  institutionRsposToCompare: string[]
}

const initialState: ComparisonState = {
  institutionRsposToCompare: []
};

export const comparisonSlice = createSlice({
  name: 'favoriteInstitutions',
  initialState,
  reducers: {
    setInstitutionRsposToCompare: (state, action: PayloadAction<string[]>) => {
      return ({
        ...state,
        institutionRsposToCompare: action.payload
      })
    },
  },
});


export const {
  setInstitutionRsposToCompare
} = comparisonSlice.actions;

export default comparisonSlice.reducer;
