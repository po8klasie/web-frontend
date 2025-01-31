import { type RouteConfig, route, index } from '@react-router/dev/routes'

export default [
    route('/app/:projectId', 'app/layout.tsx', [
        route('api/search', 'api/search/route.ts'),

        index('app/index.tsx'),
        route('map', 'app/searchPage/route.tsx'),
        route('school/:schoolId', 'app/schoolPage/route.tsx'),

        route('calculator', 'app/calculatorPage/route.tsx'),
    ]),
    route('*', 'app/404.tsx'),
] satisfies RouteConfig
