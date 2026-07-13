/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
      allowedOrigins: ["*"],
      timeout: 120,
    },
  },
  serverExternalPackages: ["cloudinary", "@supabase/ssr"], // ← added @supabase/ssr
  httpAgentOptions: {
    keepAlive: true,
  },
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;