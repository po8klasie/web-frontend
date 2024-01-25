'use client';

import * as Sentry from '@sentry/nextjs';
import { Integrations as TracingIntegrations } from '@sentry/tracing';
import { useEnvironment } from '../environment/environmentContext';
import { useEffect } from 'react';

const useSentryInit = () => {
  const {
    publicEnvironment: { APP_ENVIRONMENT, APP_FRONTEND_RELEASE, PUBLIC_SENTRY_DSN },
  } = useEnvironment();
  useEffect(() => {
    if (PUBLIC_SENTRY_DSN) {
      Sentry.init({
        dsn: PUBLIC_SENTRY_DSN,
        release: APP_FRONTEND_RELEASE,
        environment: APP_ENVIRONMENT,
        integrations: [new TracingIntegrations.BrowserTracing()],
        tracesSampleRate: 1.0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useSentryInit;
