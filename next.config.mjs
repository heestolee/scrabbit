import { withSentryConfig } from "@sentry/nextjs";

/** @type {import("next").NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: process.env.NODE_ENV === "production",
  output: "standalone",
  experimental: {
    esmExternals: false,
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
};

const sentryWebpackPluginOptions = {
  org: "leechanghee",
  project: "scrabbit",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: {
    enabled: true,
  },
  tunnelRoute: "/monitoring",
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
};

const isDevelopment = process.env.NODE_ENV === "development";

export default isDevelopment
  ? nextConfig
  : withSentryConfig(nextConfig, sentryWebpackPluginOptions);
