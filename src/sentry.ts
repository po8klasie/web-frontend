import * as Sentry from '@sentry/react'
import { useEffect } from 'react'

const initSentry = (dsn: string) =>
    Sentry.init({
        dsn,
        integrations: [Sentry.browserTracingIntegration()],

        tracesSampleRate: 1.0,
    })

export const useInitSentry = (dsn: string) => {
    useEffect(() => {
        initSentry(dsn)
    }, [dsn])
}
