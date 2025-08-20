/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },

  // ✅ Updated: moved out of `experimental`
  serverExternalPackages: ['@prisma/client'],

  // Add this line to fix the Vercel deployment issue
  output: 'standalone',
  
  // Add this to handle the client reference manifest issue
  experimental: {
    outputFileTracingIncludes: {
      '/': ['./public/**/*'],
    },
  },

  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: false,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  ignoreDuringBuilds: true,
};

module.exports = nextConfig;