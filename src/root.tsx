import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { LinksFunction } from 'react-router'
import { useEffect, type FC, type PropsWithChildren } from 'react'
import * as Sentry from '@sentry/react'

import stylesheet from './styles/global.css?url'
import Brand from './components/Brand'

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: stylesheet },
]

const queryClient = new QueryClient()

export const Layout: FC<PropsWithChildren<Record<never, never>>> = ({
    children,
}) => {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body>
                {/* children will be the root Component, ErrorBoundary, or HydrateFallback */}
                {children}
                <Scripts />
                <ScrollRestoration />
            </body>
        </html>
    )
}

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Outlet />
        </QueryClientProvider>
    )
}

interface ErrorBoundaryProps {
    error: Error
    reset: () => void
}

export const ErrorBoundary = ({ error }: ErrorBoundaryProps) => {
    useEffect(() => {
        Sentry.captureException(error)
    }, [error])

    const handleClick = () => {
        localStorage.clear()
        sessionStorage.clear()
        window.location.reload()
    }

    return (
        <div className="w-full h-full px-5 md:px-0 md:w-4/5 mx-auto">
            <div className="mt-20 flex justify-center">
                <Brand className="text-3xl md:text-5xl font-bold" />
            </div>
            <h1 className="mt-10 text-center text-2xl md:text-3xl">
                Wystąpił błąd
            </h1>
            <div className="mt-10 flex justify-center">
                <button
                    onClick={handleClick}
                    className="text-lg inline-block px-3 py-1 bg-primaryBg text-primary rounded hover:shadow transition"
                >
                    Wyczyść dane podręczne i odśwież stronę
                </button>
            </div>

            <div className="mt-10 flex justify-center">
                Jeśli problem nadal występuje
                {' - '}
                <a
                    href="https://po8klasie.pl/feedback"
                    className="underline ml-1"
                >
                    zgłoś błąd
                </a>
                .
            </div>
        </div>
    )
}
