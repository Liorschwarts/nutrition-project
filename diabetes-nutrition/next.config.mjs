/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_IMAGE_SERVICE_URL: process.env.NEXT_PUBLIC_IMAGE_SERVICE_URL,
  },
  images: {
    domains: ["localhost"],
  },
};

export default nextConfig;
