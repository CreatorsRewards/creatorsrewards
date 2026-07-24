/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // Any client request to /api/* gets forwarded...
        source: "/api/:path*",
        // ...to your NestJS backend
        destination: `${process.env.NEST_API_URL}/api/:path*`, // e.g., 'http://localhost:3001/:path*'
      },
    ];
  },
};

export default nextConfig;
