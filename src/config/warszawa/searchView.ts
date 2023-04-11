import { SearchViewConfig } from '../types';

const searchViewConfig: SearchViewConfig = {
  mapOptions: {
    center: [52.237049, 21.017532] as [number, number],
    zoom: 15,
  },
  defaultQuery: {
    project_id: 'warszawa',
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
      name: 'extended_subjects',
      component: 'extendedSubjectsFilter',
      parser: 'extendedSubjects',
      defaultValue: '',
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
    {
      name: 'school_rspo_type_ids',
      component: 'warsawDistrictsFilter',
      parser: 'array',
      defaultValue: [],
      options: {},
    },
  ],
};

export default searchViewConfig;
