/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for production (Azure Static Web Apps)
  output: 'export',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_COMMIT_SHA: process.env.COMMIT_SHA || process.env.GITHUB_SHA || 'dev',
  },
}

module.exports = nextConfig
