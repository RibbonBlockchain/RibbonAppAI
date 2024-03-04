/** @type {import('next').NextConfig} */
import path from "path";

const nextConfig = {
  images: {
    domains: ["robohash.org"],
  },
  sassOptions: {
    includePaths: [path.join(process.cwd(), "styles")],
  },
};

export default nextConfig;
