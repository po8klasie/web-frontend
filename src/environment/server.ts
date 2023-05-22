import { IEnvironment, IPublicEnvironment } from "./types";

export const publicEnvironment = {
  API_URL: process.env.API_URL ?? '',
  APP_ENVIRONMENT: process.env.APP_ENVIRONMENT ?? '',
  APP_FRONTEND_RELEASE: process.env.APP_FRONTEND_RELEASE ?? '',
  PUBLIC_SENTRY_DSN: process.env.PUBLIC_SENTRY_DSN ?? '',
  MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN ?? '',
  POSTHOG_API_KEY: process.env.POSTHOG_API_KEY ?? '',
  SHOW_LINKS_TO_APP: process.env.SHOW_LINKS_TO_APP ?? '',
  SITE_URL: process.env.SITE_URL ?? '',
} satisfies IPublicEnvironment;

const environment = {
  publicEnvironment
} satisfies IEnvironment;

export default environment
