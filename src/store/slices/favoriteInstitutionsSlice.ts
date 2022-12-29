import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FavoriteInstitutionsState {
  favoriteInstitutionsRspos: string[]
}

const initialState: FavoriteInstitutionsState = {
  favoriteInstitutionsRspos: []
};

export const favoriteInstitutionsSlice = createSlice({
  name: 'favoriteInstitutions',
  initialState,
  reducers: {
    setFavoriteInstitutionsRspos: (state, action: PayloadAction<string[]>) => {
      return ({
        ...state,
        favoriteInstitutionsRspos: action.payload
      })
    },
  },
});


export const {
  setFavoriteInstitutionsRspos
} = favoriteInstitutionsSlice.actions;

export default favoriteInstitutionsSlice.reducer;
