/* eslint-disable import/no-extraneous-dependencies */
const { withSentryConfig } = require('@sentry/nextjs');
const { i18n } = require('./next-i18next.config');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const customNextConfig = {
  basePath: '/app',
  assetPrefix: '/app/',
  env: {
    PUBLIC_URL: '',
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    APP_ENVIRONMENT: process.env.APP_ENVIRONMENT,
    APP_FRONTEND_RELEASE: process.env.APP_FRONTEND_RELEASE,
    PUBLIC_SENTRY_DSN: process.env.PUBLIC_SENTRY_DSN,
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
    POSTHOG_API_KEY: process.env.POSTHOG_API_KEY,
    SHOW_LINKS_TO_APP: process.env.SHOW_LINKS_TO_APP,
    SITE_URL: process.env.SITE_URL,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            prettier: false,
            svgo: true,
            svgoConfig: { plugins: [{ removeViewBox: false }] },
            titleProp: true,
          },
        },
      ],
    });
    return config;
  },
  // next-optimized-images options
  responsive: {
    adapter: require('responsive-loader/sharp'),
  },
  // sentry options
  sentry: {
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
  },
  productionBrowserSourceMaps: true,
  i18n,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
};

module.exports = withBundleAnalyzer(withSentryConfig(customNextConfig));
