/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/lyrics/mxm/:path*",
        destination: "https://api.musixmatch.com/ws/1.1/:path*",
      },
      {
        source: "/api/lyrics/azl/:path*",
        destination: "https://www.azlyrics.com/lyrics/:path*"
      },
      {
        source: "/api/lyrics/gle/:path*",
        destination: "https://www.google.com/search/:path*"
      }
    ];
  },
};

module.exports = nextConfig;
