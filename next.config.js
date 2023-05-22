/* eslint-disable import/no-extraneous-dependencies */
const { withSentryConfig } = require('@sentry/nextjs');
const { i18n } = require('./next-i18next.config');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const customNextConfig = {
  basePath: '/app',
  assetPrefix: '/app/',
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
  experimental: {
    esmExternals: 'loose'
  }
};

module.exports = withBundleAnalyzer(withSentryConfig(customNextConfig));
