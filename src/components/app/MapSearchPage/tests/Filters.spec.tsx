import Filters from '../Filters';
import withProjectConfig from '../../../../config/withProjectConfig';
import { store } from '../../../../store/store';
import { Provider as StoreProvider } from 'react-redux';
import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  resetFilterValues,
  setDefaultFiltersValues,
} from '../../../../store/slices/mapSearchPageDataSlice';

jest.mock('../filters/FilterComponent.tsx', () => ({ value, setValue }) => {
  return (
    <button data-testid="filterValue" onClick={() => setValue('newValue')}>
      {value}
    </button>
  );
});

const renderFilters = ({ reduxStore, filtersValues, filtersConfig }) => {
  reduxStore.dispatch(setDefaultFiltersValues(filtersValues));
  reduxStore.dispatch(resetFilterValues());

  render(
    <StoreProvider store={reduxStore}>
      {withProjectConfig(Filters)({
        PROJECT: {
          searchViewConfig: {
            filters: filtersConfig,
          },
        },
      })}
    </StoreProvider>,
  );
};

describe('Filters', () => {
  it('passes value from redux store to filter', () => {
    renderFilters({
      reduxStore: store,
      filtersValues: {
        foo: 'abc',
      },
      filtersConfig: [{ name: 'foo', component: 'fooFilter' }],
    });

    expect(screen.getByTestId('filterValue').textContent).toEqual('abc');

    jest.clearAllMocks();
  });

  it('updates redux store', () => {
    renderFilters({
      reduxStore: store,
      filtersValues: {
        foo: 'abcd',
      },
      filtersConfig: [{ name: 'foo', component: 'fooFilter' }],
    });

    expect(store.getState().mapSearchPageData.filters.foo).toEqual('abcd');

    screen.getByTestId('filterValue').click();

    expect(store.getState().mapSearchPageData.filters.foo).toEqual('newValue');

    jest.clearAllMocks();
  });
});
