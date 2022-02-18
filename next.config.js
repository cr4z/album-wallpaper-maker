/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "picsum.photos",
      "is1-ssl.mzstatic.com",
      "is2-ssl.mzstatic.com",
      "is3-ssl.mzstatic.com",
      "is4-ssl.mzstatic.com",
      "is5-ssl.mzstatic.com",
    ],
  },
};

module.exports = nextConfig;
