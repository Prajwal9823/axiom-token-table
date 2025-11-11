/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 🚀 Disable experimental lightningcss to fix Vercel Linux build error
  experimental: {
    optimizeCss: false,
    css: false,
  },
};

export default nextConfig;
