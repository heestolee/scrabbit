/** @type {import("next").NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  output: "standalone",
  experimental: {
    esmExternals: false,
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
};

export default nextConfig;
