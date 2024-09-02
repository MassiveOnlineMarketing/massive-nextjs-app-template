import webpack from "webpack";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
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

    return config;
  },
};

export default nextConfig;
