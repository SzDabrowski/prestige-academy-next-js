import { withNextVideo } from "next-video/process";
// next.config.js
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    domains: ["localhost"],
  },
};

export default withNextVideo(nextConfig);