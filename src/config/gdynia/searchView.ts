import { SearchViewConfig } from '../types';

const searchViewConfig: SearchViewConfig = {
  mapOptions: {
    center: [54.528652889406324, 18.528099060058597] as [number, number],
    zoom: 12,
  },
  defaultQuery: {
    project_id: 'gdynia',
  },
  filters: [
    {
      name: 'is_public',
      component: 'isPublicFilter',
      parser: 'booleanOrNull',
      defaultValue: null,
      options: {},
    },
    {
      name: 'rspo_institution_type',
      component: 'institutionTypeFilter',
      parser: 'rspoInstitutionTypeId',
      defaultValue: [],
      options: {},
    },
    {
      name: 'languages',
      component: 'languagesFilter',
      parser: 'array',
      defaultValue: [],
      options: {},
    },
    {
      name: 'public_transportation_stop',
      component: 'publicTransportFilter',
      parser: 'array',
      defaultValue: [],
      options: {},
    },
    {
      name: 'points_threshold',
      component: 'recruitmentPointsFilter',
      parser: 'recruitmentPointsRange',
      defaultValue: [0, 200],
      options: {},
    },
  ],
};

export default searchViewConfig;
