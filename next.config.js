/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  
  // Enable CORS headers for API routes - CRITICAL FOR CROSS-ORIGIN REQUESTS
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS, PUT, DELETE' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization, Accept, Origin, X-Requested-With' },
          { key: 'Access-Control-Max-Age', value: '86400' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
