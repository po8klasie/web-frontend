import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import produce from "immer";

export interface FavoriteInstitutionsState {
  favoriteInstitutionsRspos: Record<string, string[]>
}

const initialState: FavoriteInstitutionsState = {
  favoriteInstitutionsRspos: {
    warszawa: [],
    gdynia: []
  }
};

export const favoriteInstitutionsSlice = createSlice({
  name: 'favoriteInstitutions',
  initialState,
  reducers: {
    setFavoriteInstitutionsRspos: (state, action: PayloadAction<{rspos: string[], projectID: string}>) => produce(state, (draft) => {
      draft.favoriteInstitutionsRspos[action.payload.projectID] = action.payload.rspos
    })
  },
});


export const {
  setFavoriteInstitutionsRspos
} = favoriteInstitutionsSlice.actions;

export default favoriteInstitutionsSlice.reducer;
