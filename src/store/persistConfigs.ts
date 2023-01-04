import storage from 'redux-persist/lib/storage'

export const favoriteInstitutionsPersistConfig = {
  key: 'favoriteInstitutions',
  storage: storage,
}

export const comparisonPersistConfig = {
  key: 'comparison',
  storage: storage,
}
