/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  experimental: {
    // Required:
    appDir: true,
  },
  // https://github.com/tabler/tabler-icons/issues/359
  modularizeImports: {
    '@tabler/icons-react': {
      transform: '@tabler/icons-react/dist/esm/icons/{{member}}',
    },
  },
  transpilePackages: ['@tabler/icons-react'],
  async redirects() {
    return [
      {
        source: '/ads.txt',
        destination: 'https://api.nitropay.com/v1/ads-1406.txt',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
