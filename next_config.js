/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    EDGE_CONFIG: process.env.EDGE_CONFIG,
  },
}

module.exports = nextConfig