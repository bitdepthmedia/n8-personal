/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Ensures images don't use Next.js optimization
  },
  transpilePackages: ['@/*'],
};

let userConfig = {};

try {
  // Dynamically import user config if it exists
  userConfig = require('./v0-user-next.config');
} catch (e) {
  console.warn('No user config found, using default config.');
}

// Merge userConfig into nextConfig
const mergedConfig = {
  ...nextConfig,
  ...userConfig,
  experimental: {
    ...nextConfig.experimental,
    ...userConfig.experimental,
  },
};

export default mergedConfig;