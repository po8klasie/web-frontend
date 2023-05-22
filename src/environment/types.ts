export interface IPublicEnvironment {
  API_URL: string;
  APP_ENVIRONMENT: string;
  APP_FRONTEND_RELEASE: string;
  PUBLIC_SENTRY_DSN: string;
  MAPBOX_ACCESS_TOKEN: string;
  POSTHOG_API_KEY: string;
  SHOW_LINKS_TO_APP: string;
  SITE_URL: string;
}

export interface IEnvironment {
  publicEnvironment: IPublicEnvironment;
}
