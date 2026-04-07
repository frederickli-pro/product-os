/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Performance optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Enable compression
  compress: true,

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Enable experimental optimizations for bundle size
  experimental: {
    optimizePackageImports: ['framer-motion', 'recharts', 'lucide-react'],
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Only run optimizations in production
    if (!dev && !isServer) {
      // Enable tree shaking for better bundle size
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: true,
        moduleIds: 'deterministic',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            framework: {
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-sync-external-store)[\\/]/,
              priority: 40,
              enforce: true,
            },
            framerMotion: {
              name: 'framer-motion',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              priority: 30,
              enforce: true,
            },
            recharts: {
              name: 'recharts',
              test: /[\\/]node_modules[\\/]recharts[\\/]/,
              priority: 30,
              enforce: true,
            },
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
            },
            default: {
              minChunks: 2,
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },

  // Headers for caching and performance
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Reduce build output verbosity
  poweredByHeader: false,
}

module.exports = nextConfig
