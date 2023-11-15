/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['resizedimgs.zapimoveis.com.br'],
  },
}

module.exports = nextConfig
