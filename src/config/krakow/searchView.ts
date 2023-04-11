import { SearchViewConfig } from '../types';

const searchViewConfig: SearchViewConfig = {
  mapOptions: {
    latitude: 50.063159,
    longitude: 19.938762,
    zoom: 15,
  },
  defaultQuery: {
    page_size: '1000',
    area_query: 'Kraków',
  },
  filters: [
    {
      name: 'name_query',
      component: 'text',
      parser: 'string',
      initialValue: '',
      displayInRowOnMobile: true,
      options: {
        placeholder: 'Nazwa szkoły lub słowo kluczowe',
        icon: 'BsSearch',
      },
    },
    {
      name: 'public_school',
      component: 'dropdown',
      parser: 'none',
      initialValue: [],
      displayInRowOnMobile: false,
      options: {
        title: 'Szkoła publiczna',
        isMultipleChoice: false,
        choices: [
          {
            value: true,
            label: 'tak',
          },
          {
            value: false,
            label: 'nie',
          },
        ],
      },
    },
    {
      name: 'school_rspo_type_ids',
      component: 'dropdown',
      parser: 'none',
      initialValue: [],
      displayInRowOnMobile: false,
      options: {
        title: 'Typ szkoły',
        isMultipleChoice: false,
        choices: [
          {
            value: '14',
            label: 'liceum',
          },
          {
            value: '16',
            label: 'technikum',
          },
          {
            value: '93',
            label: 'szkoła branżowa',
          },
        ],
      },
    },
  ],
};

export default searchViewConfig;
