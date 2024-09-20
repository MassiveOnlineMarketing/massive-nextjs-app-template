import { withSentryConfig } from "@sentry/nextjs";
import webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import TerserPlugin from "terser-webpack-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add @svgr/webpack loader for SVG files
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack" }],
    });

    // Add the Reflect Metadata polyfill to the server build for DI injection
    if (isServer) {
      config.plugins.push(
        new webpack.BannerPlugin({
          banner: 'require("reflect-metadata");',
          raw: true,
          entryOnly: true,
        })
      );
    }
    // Enable detailed logging
    config.stats = {
      all: true,
      warnings: true,
      errors: true,
      errorDetails: true,
      logging: "verbose",
    };

    // Add BundleAnalyzerPlugin if ANALYZE environment variable is set
    if (process.env.ANALYZE && !config.plugins.some(plugin => plugin instanceof BundleAnalyzerPlugin)) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerPort: 8889
      }));
    }

    // Add TerserPlugin for minimizing and limiting threads
    config.optimization = {
      ...config.optimization, // Ensure other optimization settings remain intact
      minimizer: [
        new TerserPlugin({
          parallel: 2, // Limit the number of concurrent threads
        }),
      ],
    };

    return config;
  },
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: "massive-online-marketing",
  project: "javascript-nextjs",

  // An auth token is required for uploading source maps.
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
