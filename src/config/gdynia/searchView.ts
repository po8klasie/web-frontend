import { SearchViewConfig } from '../types';

const searchViewConfig: SearchViewConfig = {
  mapOptions: {
    center: [54.513525, 18.535648] as [number, number],
    zoom: 15,
  },
  defaultQuery: {
    project_id: 'gdynia',
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
