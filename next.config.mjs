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
        protocol: 'http',
        hostname: 'localhost',
        port: '3350',
        pathname: '/**',
      },
    ],
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'assets.sheetpapers.com',
  //       port: '',
  //       pathname: '/**',
  //     },
  //   ],
  // },
};

export default nextConfig;
