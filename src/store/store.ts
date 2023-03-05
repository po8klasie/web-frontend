import { configureStore } from '@reduxjs/toolkit';
import mapSearchPageDataSlice from './slices/mapSearchPageDataSlice';
import favoriteInstitutionsSlice from './slices/favoriteInstitutionsSlice';
import comparisonSlice from './slices/comparisonSlice';
import { persistStore, persistReducer } from 'redux-persist';
import { comparisonPersistConfig, favoriteInstitutionsPersistConfig } from './persistConfigs';

export const store = configureStore({
  reducer: {
    mapSearchPageData: mapSearchPageDataSlice,
    favoriteInstitutions: persistReducer(
      favoriteInstitutionsPersistConfig,
      favoriteInstitutionsSlice,
    ),
    comparison: persistReducer(comparisonPersistConfig, comparisonSlice),
  },
});

export const statePersistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
