import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: path.join(process.cwd()),
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
      allowedOrigins: ["*"],
      timeout: 120,
    },
  },
  serverExternalPackages: ["cloudinary"],
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