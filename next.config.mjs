/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',              // tells Next to emit plain HTML/JS/CSS
  reactStrictMode: true,
  experimental: { optimizeCss: false },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
};
export default nextConfig;
