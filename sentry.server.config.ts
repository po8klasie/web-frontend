import * as Sentry from '@sentry/nextjs';
import environment from "./src/environment/server";

const { APP_ENVIRONMENT, APP_FRONTEND_RELEASE, PUBLIC_SENTRY_DSN } = environment.publicEnvironment

if (PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: PUBLIC_SENTRY_DSN,
    release: APP_FRONTEND_RELEASE,
    environment: APP_ENVIRONMENT,
    tracesSampleRate: 1.0,
  });
}
