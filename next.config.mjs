/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@imgly/background-removal", "onnxruntime-web"],
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false }
    return config
  }
}
export default nextConfig
