/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // experimental: { scrollRestoration: true },
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gateway.lighthouse.storage',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
