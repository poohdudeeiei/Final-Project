/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["localhost"], // Add localhost to the list of configured domains
  },
};

module.exports = nextConfig;
