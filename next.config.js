/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for production (Azure Static Web Apps)
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
