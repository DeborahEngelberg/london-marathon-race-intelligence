/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: '/london-marathon-race-intelligence',
  assetPrefix: '/london-marathon-race-intelligence/',
};

module.exports = nextConfig;
