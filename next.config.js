/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@imgly/background-removal', 'onnxruntime-web'],
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
}
module.exports = nextConfig
