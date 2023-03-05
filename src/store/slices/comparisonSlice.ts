import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import produce from "immer";

export interface ComparisonState {
  institutionRsposToCompare: Record<string, string[]>
}

const initialState: ComparisonState = {
  institutionRsposToCompare: {
    warszawa: [],
    gdynia: []
  }
};

export const comparisonSlice = createSlice({
  name: 'favoriteInstitutions',
  initialState,
  reducers: {
    setInstitutionRsposToCompare: (state, action: PayloadAction<{rspos: string[], projectID: string}>) => produce(state, (draft) => {
      draft.institutionRsposToCompare[action.payload.projectID] = action.payload.rspos
    })
  },
});


export const {
  setInstitutionRsposToCompare
} = comparisonSlice.actions;

export default comparisonSlice.reducer;
