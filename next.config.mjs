import { withNextVideo } from "next-video/process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
  },
  sassOptions: {
    // Używamy path.resolve, aby mieć pewność co do ścieżki absolutnej
    includePaths: [path.resolve(__dirname, "src/styles")],
    // Dodajemy średnik i nową linię, aby uniknąć błędów parsowania
  },
};

export default withNextVideo(nextConfig);
