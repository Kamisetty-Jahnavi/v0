/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'], // Add your deployment domain here
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig

