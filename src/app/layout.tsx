import { Outlet, redirect, useLoaderData } from 'react-router'
import AppNavbar from '../components/AppNavbar'
import {
    CustomizationCtxReactContext,
    getCustomizationCtxFromParams,
} from '../lib/customizations/customizationContext'
import { LoaderFunctionArgs } from 'react-router'
import { useInitSentry } from '../sentry'

export const loader = async ({ params }: LoaderFunctionArgs) => {
    try {
        return {
            customizationCtx: await getCustomizationCtxFromParams(params),
            sentryDsn: process.env.SENTRY_DSN,
        }
    } catch {
        throw redirect('/404')
    }
}

const AppRoute = () => {
    const { customizationCtx, sentryDsn } = useLoaderData()
    useInitSentry(sentryDsn)

    return (
        <CustomizationCtxReactContext value={customizationCtx}>
            <div>
                <AppNavbar />
                <main
                    className={`pt-navbarHeight h-full`}
                    style={{ flex: '1 0 auto' }}
                >
                    <Outlet />
                </main>
            </div>
        </CustomizationCtxReactContext>
    )
}

export default AppRoute
