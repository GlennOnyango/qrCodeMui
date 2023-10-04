/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    modularizeImports: {
      '@mui/icons-material': {
        transform: '@mui/icons-material/{{member}}',
      },
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'source.unsplash.com',
          port: '',
          pathname: '/random',
        },
      ],
    },
    async headers() {
      return [{
        source: '/(.*)',
        headers: [
          {key:"Access-Control-Allow-Origin", value:"*"},
          {key:"Access-Control-Allow-Methods", value:"GET,OPTIONS,PATCH,DELETE,POST,PUT"},
          {key:"Access-Control-Allow-Headers", value:"X-Requested-With, Content-Type, Authorization"},
          {key:"Access-Control-Allow-Credentials", value:"true"},
          {key: 'X-Frame-Options', value: 'DENY'},
          {key: 'X-XSS-Protection', value: '1; mode=block'},
          {key: 'X-Content-Type-Options', value: 'nosniff'},
          {key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin'},
          {key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()'},

        ]
      }]
    }
}

module.exports = nextConfig
