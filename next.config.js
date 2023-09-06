/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['image.shutterstock.com',
      'mecaluxes.cdnwm.com'
    ]
  },
  experimental: {
    appDir: true
  },

  reactStrictMode: true
}

module.exports = nextConfig
